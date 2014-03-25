Lobby = function(object)
{
	// inherit events handler
    Events.call(this);
	this.template = "body->#Lobby>h1{Game Lobby &type}+button#create{create new game}+ul#game_list";
	this.type = "Lobby";

	// inherit network object
    client.networkObject.call(this, object);
}
