exports.Admiral = require("./interface").initClass("admiral", function() {
	this.position = {
		x: 0,
		y: 0,
		z: 0
	};
	this.move = function(x,y,z)
	{
		return {ok: 0};
	}
});