Game = function(_data)
{
	Events.call(this);
	this.interface = _data.interface;
	this.type = "Game";
	this.name = _data.name;
	this.id = _data.id;
	this.players = _data.players ? _data.players : [];
	this.template = "li>{"+this.id+": "+this.name+"}+button#delete{delete this game}+button#join{join this game}";
	client.networkObject.call(this, arguments);
};