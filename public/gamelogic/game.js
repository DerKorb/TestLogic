Game = function(_data)
{
	this.type = "game";
	this.name = _data.name;
	this.id = _data.id;
	this.players = [];

	this.start = {callback: function(games){

	}};
	this.join = {callback: function(status) {

	}};
	client.networkObject.call(this, arguments);
};