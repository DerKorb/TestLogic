exports.Player = require("./interface").initClass("player", function(name, socketId) {
	var games = [];
	this.name = name;
	this.socketId = socketId;
	this.interface = {
	};
});