Game = initClass("game", function(_data)
{
	this.name = _data.name;
	this.id = _data.id;
	this.players = [];

	this.start = {callback: function(games){

	}};
	this.join = {callback: function(status) {

	}};
});