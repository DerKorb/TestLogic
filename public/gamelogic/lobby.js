var a;
Lobby = function(object)
{
	this.interface = object.interface;
    Events.call(this);
	var self = this;
	this.type = "Lobby";
    this.on("spawn", function(object) {
	    if (object.type == "Game")
        {
	        object.html.appendTo(this.html.find("#game_list"));
        }
    });

	this.template = "body->#Lobby>h1{Game Lobby &type}+button#create{create new game}+ul#game_list";
    client.networkObject.call(this, arguments);
}