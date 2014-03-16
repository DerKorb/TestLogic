exports.Admiral = function() {
	this.type = "Admiral";
	this.position = {
		x: 0,
		y: 0,
		z: 0
	};
	this.move = function(x,y,z)
	{
		return {ok: 0};
	}
	require("./interface").networkObject.call(this, arguments);
};