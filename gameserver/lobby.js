var GameLobby = require("./gamelobby").GameLobby;
var Player = require("./player").Player;
var Bla = require("./bla").Bla;

var users = {"DerKorb": "asdfg"};

Lobby = function() {
	this.type = "Lobby";
	this.singleton = true;
	this.displayModule = "htmlModule";
	this.template = "#Lobby>h1{GameLobby Lobby &type}+button#create{create new game}+button#addbla{create new bla}+ul#game_list+#blas";
	this.target = "body";
	this.players = {};
	this.connectedPlayers = {};
	this.interface = {
		login: "login using your user data",
		create: "create a new game",
		join: "join a game"
	};
	require("./server").networkObject.call(this, arguments);
}

Lobby.prototype.singleton = true;
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
		else
			this.players[options.user].socketId = options.socketId;

		this.connectedPlayers[options.socketId] = this.players[options.user];
		this.addListener(options.user);
		this.emit("login", options.user, options.socketId);
		return {message: "success"};
	}

Lobby.prototype.logout = function(socketId)
	{
		if (!this.connectedPlayers[socketId])
			return {error: "not logged in"};

		this.emit("logout", sockets[socketId].playerName);
		this.removeListener(sockets[socketId].playerName);
		this.connectedPlayers[socketId].socketId = false;
		delete this.connectedPlayers[socketId];
		return {message: "success"};
	}

Lobby.prototype.create = function(options)
{
	if (!this.connectedPlayers[options.socketId])
		return {error: "not logged in"};
	var game = new GameLobby(options.name);
	this.spawn(game);
	this.emit("created");
	return {message: "success"};
};

Lobby.prototype.addbla = function()
{
	this.spawn(new Bla);
	return {};
}

Lobby.prototype.join = function(options)
{
	if (!connectedPlayers[options.socketId])
		return {error: "not logged in"};
	if (!games[options.gameId])
		return {error: "no such game"};
	games[options.gameId].join(connectedPlayers[options.socketId]);
	return {message: "success"};
}

exports.Lobby = Lobby;

