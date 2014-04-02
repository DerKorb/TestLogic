Tile = require("./tile").Tile;
Unit = require("./unit").Unit;
Game = function(options) {
	this.type = "Game";
	this.displayModule = "threeJSModule";
//	this.template = "#Lobby>h1{GameLobby Lobby &type}+button#create{create new game}+button#addbla{create new bla}+ul#game_list+#blas";
	this.isChild = true;
	this.target = "#game";
	this.canvas = true;
	this.Player = options.Player;
	this.interface = {

	};

	require("./server").networkObject.call(this, arguments);
}

Game.prototype.start = function()
{
	for (var x = -2; x<3; x++)
		for (var z = -2; z<3; z++)
			this.spawn(new Tile({position: {x: x*18+(z%2?9:0), y: 0, z: z*16}}));

	console.log(this.Player);
	for (k in this.Player)
		this.spawn(new Unit({position: {x: k*100-150, y: 20, z: 20}, owner: this.Player[k].name}));
}

exports.Game = Game;