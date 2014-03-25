Game = function(_data)
{
	Events.call(this);
	this.type = "Game";
	this.name = _data.name;
	this.id = _data.id;
	//this.players = _data.players ? _data.players : [];
	this.template = "li>{"+this.id+": "+this.name+"}+button#delete{delete this game}+button#join{join this game}+ul#players_list";
	this.target = "#game_list";
	this.on("spawn", function(object) {
		if (object.type == "Player")
			object.html.addTo(this.html.find("#players_list"));
	});
	client.networkObject.call(this, _data);
};