Game = function(_data)
{
	this.type = "Game";
	this.name = _data.name;
	this.id = _data.id;
	//this.players = _data.players ? _data.players : [];
	this.template = "li>{"+this.id+": "+this.name+"}+button#delete{delete this game}+button#join{join this game}+ul#player_list";
	this.target = "#game_list";
	client.networkObject.call(this, _data);
};