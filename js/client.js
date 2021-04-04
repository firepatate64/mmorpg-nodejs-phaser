
var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(pseudo){
    Client.socket.emit('newplayer', pseudo);
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};
Client.senda = function(){
  Client.socket.emit('clicka');
};
Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y,data.pseudo);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].pseudo);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id,data.x,data.y,data.frame,data.pv,data.pseudo);
    });

    Client.socket.on('item',function(data){
        Game.item(data);
    });
    Client.socket.on('items',function(data){
        Game.items(data);
    });
    Client.socket.on('inv',function(data){
        Game.invincible(data);
    });
    Client.socket.on('sendd',function(){
        Game.sendd();
    });
    Client.socket.on('sendz',function(){
        Game.sendz();
    });
    Client.socket.on('sendq',function(){
        Game.sendq();
    });
    Client.socket.on('sends',function(){
        Game.sends();
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
        console.log('vla'+id);
    });

    Client.socket.on('mort',function(ps){
        console.log('vla'+ps);
	Game.mort(ps);
    });

});
Client.item = function(data){
	Client.socket.emit('item');
};
Client.items = function(data){
        Client.socket.emit('items');
};

