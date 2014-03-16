var Game = require("./game").Game;

exports.Lobby = require("./interface").initClass("lobby", function() {
	var games = [];
	this.interface = {
		list: "start a new game",
		create: "create a new game"
	};

	this.create = function(options) {
		var game = new Game(options.name);
		games.push(game);
		return game.id;
	};

	this.list = function() {
		var gamelist = [];
		for(g in games)
		{
			gamelist.push({name: games[g].name, id: games[g].id});
		}
		return gamelist;
	};
});