Player = function(data)
{
	// inherit events handler
	Events.call(this);
	this.type = "Player";
	this.template = "li{"+data.name.playerName+"}";
	// inherit network object
	client.networkObject.call(this, data);
}