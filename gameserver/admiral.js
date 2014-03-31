exports.Admiral = function() {
	this.type = "Admiral";
	this.displayModule = "threeJSModule";
	this.isChild = true;

	this.position = {
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