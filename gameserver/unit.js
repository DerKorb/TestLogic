exports.Unit = function(options) {
	this.type = "Unit";
	this.displayModule = "threeJSModule";
	this.isChild = true;
	this.cube = {w: 2, h: 1, l: 1, material: "red"};

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