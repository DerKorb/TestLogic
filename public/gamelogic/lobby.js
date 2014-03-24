Lobby = function(object)
{
	console.log(object);
	// inherit events handler
    Events.call(this);
	this.type = "Lobby";

    this.on("spawn", function(object) {
	    if (object.type == "Game")
	        object.html.addTo(this.html.find("#game_list"));
    });

	// inherit network object
    client.networkObject.call(this, object);
}