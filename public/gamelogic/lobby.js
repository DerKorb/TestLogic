Lobby = function(object)
{
	// inherit events handler
	this.template = "body->#Lobby>h1{GameLobby Lobby &type}+button#create{create new game}+ul#game_list";
	this.type = "Lobby";

	// inherit network object
    client.networkObject.call(this, object);
}
