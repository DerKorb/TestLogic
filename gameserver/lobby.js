var Game = require("./game").Game;
var Player = require("./player").Player;

var users = {"DerKorb": "asdfg"};

var Lobby = function() {
	this.type = "Lobby";
	this.singleton = true;
	var games = {};
	var players = {};
	var connectedPlayers = {};
	this.interface = {
		list: "show existing games",
		login: "login using your user data",
		create: "create a new game",
		join: "join a game"
	};
	require("./server").networkObject.call(this, arguments);
}
Lobby.prototype.login = function(options)
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
		this.emit("login");
		return {message: "success"};
	}

Lobby.prototype.logout = function(socketId)
	{
		if (!connectedPlayers[socketId])
			return {error: "not logged in"};

		connectedPlayers[socketId].socketId = false;
		delete connectedPlayers[socketId];
		return {message: "success"};
	}

Lobby.prototype.create = function(options) {
		if (!connectedPlayers[options.socketId])
			return {error: "not logged in"};
		var game = new Game(options.name);
		games[game.id] = game;
		this.emit("created");
		return {message: "success"};
	};

Lobby.prototype.list = function(data) {
		var gamelist = [];
		for(g in games)
		{
			gamelist.push({name: games[g].name, id: games[g].id, players: games[g].listPlayers()});
		}
		return gamelist;
	};

Lobby.prototype.join = function(options)
	{
		if (!connectedPlayers[options.socketId])
			return {error: "not logged in"};
		if (!games[options.gameId])
			return {error: "no such game"};
		games[options.gameId].join(connectedPlayers[options.socketId]);
		return {message: "success"};
	}

Lobby.prototype.sockets = function() {
		result = [];
		for(key in connectedPlayers)
		{
			result.push(connectedPlayers[key].socketId);
		};
		return result;
	}


exports.Lobby = Lobby;
//require("util").inherits(exports.Lobby, require("./server").networkObject);
require("util").inherits(exports.Lobby, require('events').EventEmitter);
