
var Game = {};
window.pointerx = 0;
window.pointery = 0;
Game.textureperso = '';
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

Game.init = function(){
    game.stage.disableVisibilityChange = true;

    var url = window.location.href;
    var search_params = new URLSearchParams(url.search);
    var pseudo = url.substring (url.lastIndexOf( "=" )+1 );
    if(pseudo == 'http://miniman.tk/' || pseudo == 'http://play.miniman.tk/'){
       window.location.replace("http://miniman.ml/");
}
};

Game.preload = function() {
    game.load.image('map','assets/map/sans titre.png');
    game.load.image('button','assets/sprites/button.png');
    game.load.image('button5','assets/sprites/button5.png');
    game.load.image('button4','assets/sprites/button4.png');
    game.load.image('button3','assets/sprites/button3.png');
    game.load.image('button2','assets/sprites/button2.png');
    game.load.image('button1','assets/sprites/button1.png');
    game.load.image('0','assets/sprites/sprite.png');
    game.load.image('1','assets/sprites/sprite_1.png');
    game.load.image('2','assets/sprites/sprite_2.png');
    game.load.image('3','assets/sprites/sprite_3.png');
    game.load.image('4','assets/sprites/sprite_4.png');
    game.load.image('5','assets/sprites/sprite_5.png');
    game.load.image('a0','assets/sprites/asprite.png');
    game.load.image('a1','assets/sprites/asprite_1.png');
    game.load.image('a2','assets/sprites/asprite_2.png');
    game.load.image('inv','assets/sprites/bouble.png');
    game.load.image('a3','assets/sprites/asprite_3.png');
    game.load.image('a4','assets/sprites/asprite_4.png');
    game.load.image('a5','assets/sprites/asprite_5.png');
    game.load.image('heart','assets/sprites/heartt.png');
    game.load.image('axe','assets/sprites/axe.png');
    game.load.image('boot','assets/sprites/boot.png');
    game.load.image('tomb','assets/sprites/tomb.png');
    game.load.image('portail','assets/sprites/portail.png');
    game.load.audio('music','assets/sprites/Caketown 1.mp3');
};

Game.create = function(){
    Game.playerMap = {};
    Game.pseudot = {};
    var url = window.location.href;
    var search_params = new URLSearchParams(url.search);
    var pseudo = url.substring (url.lastIndexOf( "=" )+1 );
    if(pseudo == 'http://miniman.tk/'){
       window.location.replace("http://miniman.ml/");
}
    pseudo = pseudo.replace('%20',' ');
    pseudo = pseudo.replace('+',' ');
    pseudo = pseudo.replace('+',' ');
    pseudo = pseudo.replace('+',' ');
    pseudo = pseudo.replace('+',' ');
    pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');pseudo = pseudo.replace('+',' ');
    pseudo = pseudo.replace('%C3%A9','é');
    pseudo = pseudo.replace('%C3%A9','é');
    pseudo = pseudo.replace('%C3%A9','é');
    pseudo = pseudo.replace('%C3%A8','è');
    pseudo = pseudo.replace('%C3%A8','è');
    pseudo = pseudo.replace('%C3%A8','è');
    pseudo = pseudo.replace('%C3%A7','ç');
    pseudo = pseudo.replace('%C3%A7','ç');
    pseudo = pseudo.replace('%C3%A7','ç');
    pseudo = pseudo.replace('%C3%A0','à');
    pseudo = pseudo.replace('%C3%A0','à');
    pseudo = pseudo.replace('%C3%A0','à');
    pseudo = pseudo.replace('%C3%AA','ê');pseudo = pseudo.replace('%C3%AA','ê');pseudo = pseudo.replace('%C3%AA','ê');
    window.pseudo = pseudo;
    music = game.add.audio('music');
    music.play();
    var sx = window.screen.width;
    var sy = window.screen.heigth;
    game.add.image(0,0,'map');
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var estKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    estKey.onDown.add(Game.senda, this);
    var yestKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    yestKey.onDown.add(Game.sendq, this);
    var qestKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    qestKey.onDown.add(Game.sends, this);
    var bestKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    bestKey.onDown.add(Game.sendd, this);
    var gestKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    gestKey.onDown.add(Game.sendz, this);
    button = game.add.button(game.width-100, game.world.centerY, 'button2', Game.sends, game, 2, 1, 0);
    button.scale.setTo(0.15, 0.15);
    button2 = game.add.button(game.width-200, game.world.centerY, 'button5', Game.senda, game, 2, 1, 0);
    button2.scale.setTo(0.15, 0.15);
    button1 = game.add.button(game.width-200, game.world.centerY+100, 'button1', Game.sendz, game, 2, 1, 0);
    button1.scale.setTo(0.15, 0.15);
    button3 = game.add.button(game.width-200, game.world.centerY-100, 'button4', Game.sendq, game, 2, 1, 0);
    button3.scale.setTo(0.15, 0.15);
    button4 = game.add.button(game.width-300, game.world.centerY, 'button3', Game.sendd, game, 2, 1, 0);
    button4.scale.setTo(0.15, 0.15);
    portail = game.add.image(80,100,'portail');
    portail2 = game.add.image(910,720,'portail');
    line = new Phaser.Line(1,1,100,100);
    Client.askNewPlayer(pseudo);
    game.camera.flash();
};

Game.update = function() {
	Client.sendClick(window.pointerx,window.pointery);
};

Game.getCoordinates = function(layer,pointer){
    window.pointerx = pointer.worldX;
    window.pointery = pointer.worldY;
};

Game.senda = function(layer,pointer){
    Client.senda();
};

Game.sendz = function(){
    window.pointerx=0;
    window.pointery=2;
};

Game.sendq = function(){
    window.pointerx=0;
    window.pointery=-2;
};

Game.sendd = function(){
    window.pointerx=-2;
    window.pointery=0;
};

Game.sends = function(){
    window.pointerx=2;
    window.pointery=0;
};

Game.addNewPlayer = function(id,x,y,pseudo){
    Game.playerMap[id] = game.add.sprite(x,y,'0');
var style = { font: "22px Arial", fill: "#ffffff", backgroundColor: "#000000" };
    Game.pseudot[pseudo] = game.add.text(x,y-30,pseudo,style);
};

Game.movePlayer = function(id,x,y,frame,pv,pseudo){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    player.x = x;
    player.y = y;
    Game.pseudot[pseudo].x = x;
    Game.pseudot[pseudo].y = y-30;
    player.loadTexture(frame);
    ab = Game.textureperso;
    if (pv==2){
    if (frame=='0')player.loadTexture('2');
    if (frame=='1')player.loadTexture('3');
    }
    else if (pv==3){
    if (frame=='0')player.loadTexture('4');
    if (frame=='1')player.loadTexture('5');
    }
    else if (pv==1){
    if (frame=='0')player.loadTexture('0');
    if (frame=='1')player.loadTexture('1');
    }
    else{
    if (frame=='0')player.loadTexture('a4');
    if (frame=='1')player.loadTexture('a5');
    }
};

Game.removePlayer = function(d){
    console.log(d);
    game.add.image(Game.playerMap[d].x,Game.playerMap[d].y,'tomb');
    Game.playerMap[d].destroy();
    delete Game.playerMap[d];
};
Game.classement = function(data){
	var text = '';
	for (i = 0; i < data.length; i++) {
  		text += data[i].pseudo+'\n';
	}
	tex = game.add.text(900,0,text);
}
Game.mort = function(pseudox) {
	if(pseudox == window.pseudo){
		window.location.replace('http://miniman.ga/');
	}
}

Game.item = function(data){
	Game.item = game.add.sprite(data.x,data.y,data.sort);
}
Game.items = function(data){
        Game.item.x = data.x;
	Game.item.y = data.y;
	Game.item.loadTexture(data.sort);
}

Game.invincible = function(vrai){
	console.log(vrai)
	if(vrai=='o'){Game.textureperso = 'a';} else { Game.textureperso = '';}
}
