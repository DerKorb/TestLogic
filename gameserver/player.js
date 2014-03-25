exports.Player = function(data) {
	this.type ="Player";
	var games = [];
	this.name = data.playerName;
	this.socketId = data.socketId;
	this.interface = {
		info: "query player info"
	};

	this.template = "li{"+data.playerName+"}";
	this.target = "#player_list";
	this.isChild = true;

	require("./server").networkObject.call(this, arguments);
};

exports.Player.prototype.info = function(options)
{
	return {};
}