io = require('socket.io').listen(1337, {log: false});
Game = require("./game");
Lobby = require("./lobby").Lobby;
sockets = {};
var sockets_by_name = {};

var lobby;
exports.start = function(_app)
{
	io.sockets.on("connection", connect_client);
	lobby = new Lobby();
	console.log(Lobby.prototype.singleton);
	lobby.on("login", function(playerName, socketId)
	{
		sockets[socketId].playerName = playerName;
		sockets_by_name[playerName] = sockets[socketId];
	});
}

exports.sendUpdate = function(object, options) {
	for (socket in sockets)
	{
		sockets[socket].emit("update", data);
	}
}

uniqueId = 1;
connect_client = function(socket) {
	socket.socketId = uniqueId++;
	sockets[socket.socketId] = socket;
	socket.emit("message", "connected");
	socket.on("interface", function(data) {
		data.socketId = socket.socketId;
		var result = interface(data);
		if (result.error)
		{
			return socket.emit("error", {type: data.type, command: data.command, id: data.id, message: result.error});
		}
		if (result.message)
		{
			return socket.emit("message", {type: data.type, command: data.command, id: data.id, message: result.message});
		}
		socket.emit("result", {type: data.type, command: data.command, id: data.id, result: result});
	});
	socket.on("disconnect", function() {
		lobby.logout(socket.socketId);
		delete sockets[socket.socketId];
	});
	socket.emit("object", lobby);
}

var ids = {};
var pools = {};
var interface = {};

var networkObject = function() {
	var self = this;

	// keep max id and pools up to date:
	if (!ids[this.type])
		ids[this.type] = 1;
	if (!pools[this.type])
		pools[this.type] = {};
	this.id = ids[this.type]++;
	pools[this.type][this.id] = this;

	// Inherit Eventemmiter
	EE = require('events').EventEmitter;
	this.on = EE.prototype.on.bind(this);
	this.emit = EE.prototype.emit.bind(this);

	this.destroy = function()
	{
		for (r in this.receipients)
		{
			var name = receipients[r];
			sockets_by_name[name].emit("destroy", {id: self.id, type: self.type});
		}
		this.emit("destroyed", {type: self.type, id: self.id});
		delete pools[self.type][self.id];
	}

	this.spawn = function(object, receipients) {
		if (!object.receipients)
			object.receipients = self.receipients;
		if (object.singleton)
			this[object.type] = object;
		else
		{
			if (!this[object.type])
				this[object.type] = {};
			this[object.type][object.id] = object;
		}
		this.spawnCast(object);
	}

	this.broadCast = function(receipients, object) {
		if (!object)
			object = this;
		for (r in object.receipients)
		{
			var name = receipients[r];
			sockets_by_name[name].emit("object", {object: object, id: this.id, type: this.type});
		}
	}

	this.spawnCast = function(object) {
		if (!object)
			object = this;
		var receipients = object.receipients ? object.receipients : self.receipients;
		for (r in receipients)
		{
			var name = receipients[r];
			sockets_by_name[name].emit("spawn", {object: object, id: this.id, type: this.type});
		}

	}
	this.addListener = function(listener)
	{
		if (!this.receipients)
			this.receipients = [];
		this.receipients.push(listener);
	}

	this.removeListener = function(listener)
	{
		if (this.receipients.indexOf(listener)!==-1)
			this.receipients.splice(this.receipients.indexOf(listener),1);
	}

}

addToPool = function(type, id, object)
{

}

exports.networkObject = networkObject;

var interface = function(data)
{
	if (!pools[data.type])
		return {error: "unknown interface"};

	if (!data.id)
		data.id = 1;

	if (!data.query)
		data.query = {};
	data.query.socketId = data.socketId;
	data.query.playerName = sockets[data.socketId].playerName;

	if (!pools[data.type][data.id])
		return {error: "object does not exist"};

	if (!pools[data.type][data.id].interface[data.command])
		return {error: "unknown command"};

	return pools[data.type][data.id][data.command].call(pools[data.type][data.id], data.query);
};