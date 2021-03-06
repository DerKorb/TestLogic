io = require('socket.io').listen(1337, {log: false});
Game = require("./gamelobby");
Lobby = require("./lobby").Lobby;
sockets = {};
var sockets_by_name = {};

var lobby;
exports.start = function(_app)
{
	io.sockets.on("connection", connect_client);
	lobby = new Lobby();
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

	// events
	var self = this;
	this._listeners = {};
	this.on = function(tag, callback) {
		if (!self._listeners[tag])
			self._listeners[tag] = [];
		this._listeners[tag] = [callback].concat(self._listeners[tag]);
	}

	this.emit = function()
	{
		var tag = arguments[0];
		var args = [].slice.call(arguments);
		args.shift();
		for(l in self._listeners[tag])
			self._listeners[tag][l].apply(this, args);
		for (r in self.receipients)
		{
			var name = self.receipients[r];
			sockets_by_name[name].emit("event", {type: self.type, id: self.id, data: args, event: tag});
		}
	}

	// network synchronity:
	this.delete = function() // DELETE
	{
		this.emit("deleted", this);
		delete pools[this.type][this.id];
		return {message: "success"};
	}

	this.set = function(changes) { // UPDATE
		for (key in changes)
			self[key] = changes[key];
		self.emit("update", changes);
	}

	this.spawn = function(object, receipients) { // INSERT
		if (!object.receipients)
			object.receipients = self.receipients;
		if (object.isChild)
		{
			if (object.singleton)
				this[object.type] = object;
			else {
				if (!this[object.type])
					this[object.type] = {list: true};
				this[object.type][object.id] = object;
			}
			object.on("deleted", this._delete);
		}
		this.emit("spawn", object ? object : this);
	}

	this._delete = function(object)
	{
		delete self[object.type][object.id]; //todo: singleton;
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