var Admiral = require("./admiral").Admiral;
var Player = require("./player").Player;
exports.Admiral = Admiral;
exports.Player = Player;

exports.Game = require("./interface").initClass("game", function(name) {
	var admirals = [];
	var players = [];
	this.name = name ? name : "game without a name";
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
		players.push(player);
	}

	this.listPlayers = function() {
		return players.map(function(a) {return a.name});
	}
});