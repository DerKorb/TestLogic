var Game = require("./game").Game;
var Player = require("./player").Player;

var users = {"DerKorb": "asdfg"};

Lobby = function() {
	this.type = "Lobby";
	this.singleton = true;
	this.games = {};
	this.players = {};
	this.connectedPlayers = {};
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
		if (this.connectedPlayers[options.socketId])
			return {error: "already logged in as "+this.connectedPlayers[options.socketId].name};

		if (!users[options.user])
			return {error: "user unknown"};

		if (users[options.user]!=options.pwd)
			return {error: "wrong password"};

		if (!this.players[options.user])
			this.players[options.user] = new Player(options.user, options.socketId);

		this.connectedPlayers[options.socketId] = this.players[options.user];
		this.emit("login", options.user);
		return {message: "success"};
	}

Lobby.prototype.logout = function(socketId)
	{
		if (!this.connectedPlayers[socketId])
			return {error: "not logged in"};

		this.emit("logout", this.connectedPlayers[socketId].name);
		this.connectedPlayers[socketId].socketId = false;
		delete this.connectedPlayers[socketId];
		return {message: "success"};
	}

Lobby.prototype.create = function(options) {
		if (!this.connectedPlayers[options.socketId])
			return {error: "not logged in"};
		var game = new Game(options.name);
		this.spawn(game);
		this.games[game.id] = game;
		this.emit("created");
		return {message: "success"};
	};

Lobby.prototype.list = function(data) {
		var gamelist = [];
		for(id in this.Game)
		{
			gamelist.push({name: this.Game[id].name, id: id, players: this.games[id].listPlayers()});
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

Lobby.prototype.sockets = function()
{
	result = [];
	for(key in this.connectedPlayers)
	{
		result.push(this.connectedPlayers[key].socketId);
	};
	return result;
}
exports.Lobby = Lobby;

