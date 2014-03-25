Game = function(_data)
{
	this.type = "Game";
	this.name = _data.name;
	this.id = _data.id;
	//this.players = _data.players ? _data.players : [];
	client.networkObject.call(this, _data);
};