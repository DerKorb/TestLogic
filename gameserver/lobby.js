var Game = require("./game").Game;
var Player = require("./player").Player;

var users = {"DerKorb": "asdfg"};

exports.Lobby = require("./interface").initClass("lobby", function() {
	var games = [];
	var players = {};
	var connectedPlayers = {};
	this.interface = {
		list: "show existing games",
		login: "login using your user data",
		create: "create a new game"
	};

	this.login = function(options)
	{
		if (connectedPlayers[options.socketId])
			return {error: "already logged in as "+connectedPlayers[options.socketId].name};

		if (!users[options.user])
			return {error: "user unknown"};

		if (users[options.user]!=options.pwd)
			return {error: "wrong password"};

		if (!players[options.user])
			players[options.user] = new Player(options.user, options.socketId);

		connectedPlayers[options.socketId] = players[options.user];
		return {message: "success"};
	}

	this.logout = function(socketId)
	{
		if (!connectedPlayers[socketId])
			return {error: "not logged in"};

		connectedPlayers[socketId].socketId = false;
		delete connectedPlayers[socketId];
		return {message: "success"};
	}

	this.create = function(options) {
		if (!connectedPlayers[options.socketId])
			return {error: "not logged in"};
		var game = new Game(options.name);
		games.push(game);
		game.join(connectedPlayers[options.socketId]);
		return game;
	};

	this.list = function(data) {
		var gamelist = [];
		for(g in games)
		{
			gamelist.push({name: games[g].name, id: games[g].id, players: games[g].listPlayers()});
		}
		console.log(gamelist);
		return gamelist;
	};
});