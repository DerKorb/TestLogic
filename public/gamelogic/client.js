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
			console.log(data);
			if (that[data.type]._callbacks[data.command])
				that[data.type]._callbacks[data.command](data.result);

		});
		this._socket = socket;
	}

	this._socket = socket;

	this.login = function(user, pwd) {
		this.lobby = new Lobby();
		this.lobby.login({user: user, pwd: pwd});
		this.lobby.list();
	}

	this.initConnection();
	this.objects = {};
};
var client;
$(function() {
	client = new Client();
	client.login("DerKorb", "asdfg");
});


