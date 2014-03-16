exports.Player = function(name, socketId) {
	this.type ="Player";
	var games = [];
	this.name = name;
	this.socketId = socketId;
	this.interface = {
	};
	require("./server").networkObject.call(this, arguments);
};