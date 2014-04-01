Player = function (data)
{
	// inherit events handler
	this.type = "Player";
	this.template = "li{" + data.name + "}";
	this.target = "#player_list";
	// inherit network object
	client.networkObject.call(this, data);
}