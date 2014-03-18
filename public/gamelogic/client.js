var Client = function(options)
{
	var socket;
	var self = this;
	this.options = options;
	this.spawn = options.spawn;

	this.networkObject = function() {
		this._callbacks = {};
		this._listeners = {}
		this.on = function(tag, callback) {
			if (!this._listeners[tag])
				this._listeners[tag] = [];
			this._listeners[tag] = [callback].concat(this._listeners[tag]);
		}
		this.emit = function() {
			var tag = arguments[0];
			arguments.shift();
			for(l in this._listeners._listners[tag])
				this._listners[tag][l].call(this, arguments);
		}
		var _data = {};
		for(key in this)
		{
			if (!this[key] || !this[key].callback)
				continue;
			this._callbacks[key] = this[key].callback;
			_data[key] = this[key.data];
			if (this._callbacks[key])
			{
				this[key] = function()
				{
					var data = {
						type: this.type,
						command: this.key,
						query: arguments[0]
					}
					client._socket.emit("interface", data);
				}.bind({key: key, callback: this._callbacks[key], type: this.type});
			}
		}
	}

	this._socket = socket;

	this.initConnection();
	this.objects = {};
};

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
		console.log(data);
		if (self[data.type]._callbacks[data.command])
			self[data.type]._callbacks[data.command](data.result);

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


