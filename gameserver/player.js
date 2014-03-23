exports.Player = function(data) {
	this.type ="Player";
	var games = [];
	this.name = data.playerName;
	this.socketId = data.socketId;
	this.interface = {
		info: "query player info"
	};

	require("./server").networkObject.call(this, arguments);
};

exports.Player.prototype.info = function(options)
{
	return {};
}