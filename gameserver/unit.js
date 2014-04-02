exports.Unit = function(options) {
	this.type = "Unit";
	this.displayModule = "threeJSModule";
	this.isChild = true;
	this.cube = {w: 2, h: 1, l: 1, material: "red"};
	this.owner = options.owner;

	this.target = {u: 0, v: 0};
	this.interface = {move: "order a move command"};
	this.position = options.position ? options.position : {
		x: 0,
		y: 0,
		z: 0
	};

	this.move = function(target)
	{
		if (target.playerName != this.owner)
			return {error: "you don't controll this unit"};

		this.set({target: {u: target.u, v: target.v}});
		return {ok: 0};
	}
	require("./server").networkObject.call(this, arguments);
};