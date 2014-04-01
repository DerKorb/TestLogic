Admiral = require("./admiral").Admiral;
Game = function(options) {
	this.type = "Game";
	this.displayModule = "threeJSModule";
//	this.template = "#Lobby>h1{GameLobby Lobby &type}+button#create{create new game}+button#addbla{create new bla}+ul#game_list+#blas";
	this.isChild = true;
	this.target = "#game";
	this.canvas = true;
	this.interface = {
	};

	require("./server").networkObject.call(this, arguments);
}

Game.prototype.start = function()
{
	for (var x = -12; x<13; x++)
		for (var z = -12; z<13; z++)
			this.spawn(new Admiral({position: {x: x*18+(z%2?8:0), y: 0, z: z*16}}));
}

exports.Game = Game;