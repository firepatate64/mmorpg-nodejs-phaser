var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});
server.item = {x: 200, y: 200, sort: 'boot'};

io.on('connection',function(socket){

    socket.on('newplayer',function(pseudo){
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400),
            frame: '0',
            pv: 3,
            pseudo: pseudo,
	    boost: 1,
	    axe: 1
        };
        socket.emit('allplayers',getAllPlayers());
	socket.emit('item',server.item);
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('click',function(data){
	    if (socket.player.x<100){if (socket.player.y<140){socket.player.x = 900; socket.player.y = 660;} else {socket.player.x = 101;}}
	    else if (socket.player.y<100){socket.player.y = 101;}
            else if (socket.player.x>900){socket.player.x = 899;}
            else if (socket.player.y>700){if (socket.player.x>860){socket.player.x = 100; socket.player.y = 120;} else {socket.player.y = 699;}}
            else {socket.player.x = socket.player.x + data.x*socket.player.boost;
            socket.player.y = socket.player.y+data.y*socket.player.boost;
            io.emit('move',socket.player);}
        });
        socket.on('clicka',function(data){
            var object = getAllPlayers();
            for (const property in object) {
  		if (object[property].frame!='1' && object[property].x>socket.player.x-50 && object[property].x<socket.player.x+50 && object[property].y>socket.player.y-50 && object[property].y<socket.player.y+50 && object[property]!=socket.player){
			object[property].pv = object[property].pv - socket.player.axe;
  			if(object[property].pv<1){
				io.emit('remove',object[property].id);
				io.emit('mort',object[property].pseudo);
}
}
}
console.log("tu fous qoi");
		if (server.item.x>socket.player.x-50 && server.item.x<socket.player.x+50 && server.item.y>socket.player.y-50 && server.item.y<socket.player.y+50){
                        server.item.x = 1000;
                        server.item.y = 1000;
                        if(server.item.sort == 'heart'){
				if(socket.player.pv<3){socket.player.pv = socket.player.pv+1;}
			} else if(server.item.sort == 'boot'){
				socket.player.boost = 2;
				setTimeout(function(){socket.player.boost = 1;}, 5000);
			} else if(server.item.sort == 'inv'){
				socket.player.pv = 4;
			} else {
				socket.player.axe = 2;}
			if (randomInt(1,6)==2){
			server.item.sort = 'boot';
			} else if (randomInt(1,5) == 2){
			server.item.sort = 'inv';
			} else if (randomInt(1,4) == 2){
			server.item.sort = 'heart';
			} else{
			server.item.sort = 'axe';
			}
			io.emit('items',server.item);
                        setTimeout(function(){
			server.item.x = randomInt(100,400);
			server.item.y = randomInt(100,400);
			io.emit('items',server.item);}, 5000);
			console.log("ya une patate qui a clique au mauvais endroit");
			}
            socket.player.frame = "1";
            io.emit('move',socket.player);
            setTimeout(function(){
            socket.player.frame = "0";
            io.emit('move',socket.player);
            }, 500);

        });
        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
