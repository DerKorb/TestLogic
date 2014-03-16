var Client = function()
{
	var socket;
	var that = this;
	this.initConnection = function()
	{
		socket = io.connect("http://localhost:1337");
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
			if (that[data.type]._callbacks[data.command])
				that[data.type]._callbacks[data.command](data.result);

		});
		socket.on("object", function(object) {
			console.log("object", object);
			if (!that[object.type])
				that[object.type] = {};

			if (!that[object.type][object.id])
			if (object.singleton)
				that[object.type] = new window[object.type];
			else
				that[object.type][object.id] = new window[object.type];


		});
		this._socket = socket;
	}

	this.networkObject = function() {
		this._callbacks = {};
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

	this.login = function(user, pwd) {
		/*this.Lobby = new Lobby();
		this.Lobby.login({user: user, pwd: pwd});
		this.Lobby.list();*/
	}

	this.initConnection();
	this.objects = {};
};
var client;
$(function() {
	client = new Client();
	client.login("DerKorb", "asdfg");
});


