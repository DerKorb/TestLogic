var pools = {};
var templates = {};

var Client = function (options)
{
	this.options = options;
	this.spawn = options.spawn;
	this.objects = {};
	this.initConnection();
};
Client.prototype.constructor = Client;


Client.prototype.networkObject = function ()
{
	var self = this;
	this._listeners = {};
	this.on = function (tag, callback)
	{
		if (!self._listeners[tag])
			self._listeners[tag] = [];
		this._listeners[tag] = [callback].concat(self._listeners[tag]);
	}

	this.emit = function ()
	{
		var tag = arguments[0];
		var args = [].slice.call(arguments);
		args.shift();
		for (l in self._listeners[tag])
			self._listeners[tag][l].apply(this, args[0]);
	}

	if (!pools[self.type])
		pools[self.type] = {};
	pools[self.type][self.id] = this;

	this.log = function ()
	{
		console.log.apply(console, arguments);
	}

	if (self.displayModule)
		self.displayModule = window[self.displayModule].call(this);

	if (self.displayModule)
		self.displayModule.init();

	this.on("update", function (changes)
	{
		for (key in changes)
			self[key] = changes[key];
	});

	this.on("deleted", function ()
	{
		if (self.displayModule)
			self.displayModule.delete();
		delete pools[this.type][this.id] // todo: singleton
	});

	this.on("spawn", function (spawn)
	{
		console.log(self.type, "[" + self.id + "]: spawned", spawn.type, "[" + spawn.id + "]");
		self._spawn(client.networkObject.call(spawn));
	});

	this._spawn = function (spawnling)
	{
		if (!self[spawnling.type])
			self[spawnling.type] = {};
		self[spawnling.type][spawnling.id] = spawnling;
		//self.emit("spawn", spawnling);
		spawnling.on("deleted", function (data)
		{
			delete self[spawnling.type][spawnling.id]; // todo: singleton
		});
		if (self.displayModule) {
			self.displayModule.spawn(spawnling);
		}
		return spawnling;
	}

	for (var key in self) {
		if (key == "_listeners" || key == "displayModule") // todo: allow array of modules
			continue;
		if (self[key].type)
			this._spawn(client.networkObject.call(parent[key]));

		if (self[key].list)
			for (id in self[key])
				this._spawn(client.networkObject.call(self[key][id]));
	}

	var _data = {};
	for (key in self.interface) {
		self[key] = function ()
		{
			var data = {
				type: this.type,
				id: self.id,
				command: this.key,
				query: arguments[0]
			}
			client._socket.emit("interface", data);
		}.bind({key: key, type: self.type});
	}

	if (typeof(window[this.type]) == "function")
		window[this.type].call(this);
	return this;
}
Client.prototype.initConnection = function ()
{
	var self = this;
	var socket = io.connect("http://"+document.domain+":1337");

	socket.on("message", function (message)
	{
		if (message.message)
			console.log(message.type + "::" + message.command + " - " + message.message);
		else
			console.log(message);
	});
	socket.on("error", function (error)
	{
		console.log(error.type + "::" + error.command + " - " + error.message);
	});

	socket.on("result", function (data)
	{
		/*if (typeof(self[data.type].[data.command]) == "function")
		 self[data.type].interface[data.command].call(null, data.result);*/

	});
	socket.on("object", function (object)
	{
		if (!self[object.type])
			self[object.type] = {};

		if (object.singleton)
			self[object.type] = self.networkObject.call(object);
		else
			self[object.type][object.id] = self.networkObject.call(object);

		if (typeof(self.spawn) == "function")
			self.spawn.call(self, object);
	});
	socket.on("spawn", function (spawn)
	{
		// create a pool of the objects type if not already exists:
		if (pools[spawn.type].type) {
			console.log(spawn.type, ": spawned", spawn.object.type, "[" + spawn.object.id + "]");
			pools[spawn.type]._spawn(self.networkObject.call(spawn.object));
		}
		else {
			console.log(spawn.type, "[" + spawn.id + "]: spawned", spawn.object.type, "[" + spawn.object.id + "]");
			pools[spawn.type][spawn.id]._spawn(self.networkObject.call(spawn.object));
		}
	});

	socket.on("event", function (event)
	{
		//console.log("event", typeof(event.data));
		pools[event.type][event.id].emit(event.event, event.data);
	});
	this._socket = socket;
}
var client;
$(function ()
{
	client = new Client(
		{
			spawn: function (object)
			{
				if (object.type == "Lobby") {
					if (!getCookie("user"))
					{
						var user = prompt("username");
						var pwd = prompt("password");
						this.Lobby.login({user: user, pwd: pwd});
						createCookie("user", user, 10);
						createCookie("pwd", pwd, 10);
					}
				}
			}
		});
});

var createCookie = function(name, value, days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}
