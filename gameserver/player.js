exports.Player = function(name, socketId) {
	this.type ="Player";
	var games = [];
	this.name = name;
	this.socketId = socketId;
	require("./server").networkObject.call(this, arguments);
};