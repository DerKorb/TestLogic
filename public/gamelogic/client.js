var Client = function(options)
{
	this.options = options;
	this.spawn = options.spawn;
	this.objects = {};
	this.initConnection();
};
Client.prototype.constructor = Client;

Client.prototype.networkObject = function() {
	var self = this;
	this._listeners = {}
	this.on = function(tag, callback) {
		if (!self._listeners[tag])
			self._listeners[tag] = [];
		this._listeners[tag] = [callback].concat(self._listeners[tag]);
	}
	this.emit = function() {
		var tag = arguments[0];
		arguments.shift();
		for(l in self._listeners._listners[tag])
			self._listners[tag][l].call(this, arguments);
	}
	var _data = {};
	for(key in self.interface)
	{
		self[key] = function()
		{
			var data = {
				type: this.type,
				command: this.key,
				query: arguments[0]
			}
			client._socket.emit("interface", data);
		}.bind({key: key, type: self.type});
	}
}
Client.prototype.initConnection = function()
{
	var self = this;
	console.log(self.spawn);
	var socket = io.connect("http://localhost:1337");

	socket.on("message", function(message) {
		if (message.message)
			console.log(message.type+"::"+message.command+" - "+message.message);
		else
			console.log(message);
	});
	socket.on("error", function(error) {
		console.log(error.type+"::"+error.command+" - "+error.message);
	});

	socket.on("result", function(data) {
		console.log("data", data);
		if (typeof(self[data.type].interface[data.command]) == "function")
			self[data.type].interface[data.command].call(null, data.result);

	});
	socket.on("object", function(object) {
		console.log("object", self.spwan);
		if (!self[object.type])
			self[object.type] = {};

		//if (!self[object.type][object.id])
		{
			if (object.singleton)
				self[object.type] = new window[object.type](object);
			else
				self[object.type][object.id] = new window[object.type](object);
		}
		if (typeof(self.spawn) == "function")
			self.spawn.call(self, object);


	});
	this._socket = socket;
}
var client;
$(function() {
	client = new Client({spawn: function(object) {
			console.log("spawned", object);
			if (object.type == "Lobby")
			{
				this.Lobby.login({user: "DerKorb", pwd: "asdfg"});
			}
	}});
});


