Game = function(_data)
{
	this.type = "Game";
	this.name = _data.name;
	this.id = _data.id;
	this.players = _data.players ? _data.players : [];

	this.start = {callback: function(games)
    {

	}};
	this.join = {callback: function(status)
    {

	}};
	client.networkObject.call(this, false);
};