var Game = require("./game").Game;



exports.Lobby = require("./interface").initClass("lobby", function() {
	var games = [];
	this.interface = {
		list: "start a new game",
		login: "login using your user data",
		create: "create a new game"
	};

	this.login = function(options)
	{
		console.log(options.user);
	}

	this.create = function(options) {
		var game = new Game(options.name);
		games.push(game);
		game.join();
		return game;
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