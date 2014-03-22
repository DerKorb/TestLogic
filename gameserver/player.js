exports.Player = function(name, socketId) {
	this.type ="Player";
	var games = [];
	this.name = name;
	this.socketId = socketId;
	this.interface = {
		info: "query player info"
	};

	require("./server").networkObject.call(this, arguments);
};

exports.Player.prototype.info = function(options)
{
	return {};
}