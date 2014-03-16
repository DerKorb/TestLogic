interface = require("./interface");
io = require('socket.io').listen(1337, {log: false});
Game = require("./game");
Lobby = require("./lobby").Lobby;
sockets = {};

exports.start = function(_app)
{
	io.sockets.on("connection", connect_client);
	lobby = new Lobby();
}

exports.sendUpdate = function(object, options) {
	console.log(object);
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
		var result = interface.interface(data);
		if (result.error)
		{
			return socket.emit("error", {type: data.type, command: data.command, id: data.id, message: result.error});
		}
		if (result.message)
		{
			return socket.emit("message", {type: data.type, command: data.command, id: data.id, message: result.message});
		}
		socket.emit("result", {type: data.type, command: data.command, id: data.id, result: result});
		socket.emit("object", this.lobby);
	});
	socket.on("disconnect", function() {
		lobby.logout(socket.socketId);
		delete sockets[socket.socketId];
	});
}