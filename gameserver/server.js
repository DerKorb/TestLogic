io = require('socket.io').listen(1337, {log: false});
Game = require("./game");
Lobby = require("./lobby").Lobby;
sockets = {};

var lobby;
exports.start = function(_app)
{
	io.sockets.on("connection", connect_client);
	lobby = new Lobby();
	/*lobby.on("login", function() {
		console.log("login");
	});*/
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
		console.log(result);
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

	if (!ids[this.type])
		ids[this.type] = 1;
	if (!pools[this.type])
		pools[this.type] = {};
	this.id = ids[this.type]++;
	pools[this.type][this.id] = this;
	//require('events').EventEmitter.apply(this, arguments);
}
EventEmitter = require('events').EventEmitter;
networkObject.prototype = new EventEmitter();
networkObject.prototype.constructor = networkObject;
//require("util").inherits(networkObject, require('events').EventEmitter);

networkObject.prototype.broadCast = function(receipients) {
	if (receipients == "lobby")
	{
		var socketIds = lobby.sockets();
		for(s in socketIds)
		{
			if (sockets[socketIds[s]])
				sockets[socketIds[s]].emit("object", this);
		}
	}
}
//require("util").inherits(networkObject, require('events').EventEmitter);

exports.networkObject = networkObject;
exports.test = 1;

var interface = function(data)
{
	if (!pools[data.type])
		return {error: "unknown interface"};

	if (!data.id)
		data.id = 1;

	if (!data.query)
		data.query = {};
	data.query.socketId = data.socketId;

	if (!pools[data.type][data.id])
		return {error: "object does not exist"};

	if (!pools[data.type][data.id].interface[data.command])
		return {error: "unknown command"};

	return pools[data.type][data.id][data.command].call(null,data.query);
};