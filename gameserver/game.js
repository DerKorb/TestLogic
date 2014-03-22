var Admiral = require("./admiral").Admiral;
var Player = require("./player").Player;
exports.Admiral = Admiral;
exports.Player = Player;

exports.Game = function(name) {
	this.type = "Game";
	var admirals = [];
	this.players = {};
	this.name = name ? name : "game without a name";
	var self = this;
	this.interface = {
		start: "start a new game",
		join: "join the game"
	};
	this.start = function(players) {
		for(p in players)
		{
			admirals.push(new Admiral({pos: {x: 0, y: 0, z: 0}}));
		}
	}

	this.join = function(player) {
		self.players[player] = self.spawn(new Player(player));
		return {message: "success"};
	}

	require("./server").networkObject.call(this, arguments);
};