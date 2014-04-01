exports.Tile = function(options) {
	this.type = "Tile";
	this.displayModule = "threeJSModule";
	this.isChild = true;
	this.regular = {n: 6, radius: 9};

	this.position = options.position ? options.position : {
		x: 0,
		y: 0,
		z: 0
	};

	this.move = function(x,y,z)
	{
		return {ok: 0};
	}
	require("./server").networkObject.call(this, arguments);
};