var Admiral = require("./admiral").Admiral;
exports.Admiral = Admiral;

exports.Game = require("./interface").initClass("game", function() {
	var admirals = [];
	this.start = function(players) {
		for(p in players)
		{
			admirals.push(new Admiral({pos: {x: 0, y: 0, z: 0}}));
		}
	}
});