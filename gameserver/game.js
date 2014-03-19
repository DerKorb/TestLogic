var Admiral = require("./admiral").Admiral;
var Player = require("./player").Player;
exports.Admiral = Admiral;
exports.Player = Player;

exports.Game = function(name) {
	this.type = "Game";
	var admirals = [];
	this.players = [];
	this.name = name ? name : "game without a name";
	var that = this;
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
		that.players.push(player);
		return {success: true};
	}

	this.listPlayers = function() {
		return that.players.map(function(a) {return a.name});
	}
	require("./server").networkObject.call(this, arguments);
};