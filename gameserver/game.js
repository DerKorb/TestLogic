var Admiral = require("./admiral").Admiral;
exports.Admiral = Admiral;

exports.Game = require("./interface").initClass("game", function(name) {
	var admirals = [];
	console.log(name);
	this.name = name ? name : "game without a name";
	this.interface = {start: "start a new game"};
	this.start = function(players) {
		for(p in players)
		{
			admirals.push(new Admiral({pos: {x: 0, y: 0, z: 0}}));
		}
	}
});