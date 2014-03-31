Admiral = require("./admiral").Admiral;
Game = function(options) {
	this.type = "Game";
	this.displayModule = "threeJSModule";
//	this.template = "#Lobby>h1{GameLobby Lobby &type}+button#create{create new game}+button#addbla{create new bla}+ul#game_list+#blas";
	this.target = "body";
	this.canvas = true;
	this.interface = {
	};

	require("./server").networkObject.call(this, arguments);
}

Game.prototype.start = function()
{
	this.spawn(new Admiral());
}

exports.Game = Game;