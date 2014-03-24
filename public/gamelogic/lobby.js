Lobby = function(object)
{
	// inherit events handler
    Events.call(this);
	Lobby.prototype.template = "body->#Lobby>h1{Game Lobby &type}+button#create{create new game}+ul#game_list";
	this.type = "Lobby";

    this.on("spawn", function(object) {
	    if (object.type == "Game")
	        object.html.addTo(this.html.find("#game_list"));
    });

	this.on("login", function(data)
	{
		console.log("jeah", data);
	});
	// inherit network object
    client.networkObject.call(this, object);
}
