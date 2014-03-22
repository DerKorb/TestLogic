Lobby = function(object)
{
    Events.call(this);
	var self = this;
	this.type = "Lobby";
	this.template = true;
    this.on("spawn", function(object) {
        if (object.type == "Game")
        {
            $("<li>").appendTo("#game_list").text(object.id+": "+object.name);
        }
    });
    this.on("template", function(html) {
	    console.log(html);
	    $("<div>").addClass(self.type).html(html).appendTo("body");
    });
    client.networkObject.call(this, arguments);
}

Lobby.prototype.interface = {
	join: true,
	list: true,
	login: true,
	create: true
}

Lobby.prototype.list = {callback: function(games){
	$("#game_list").empty();
	for (g in games)
	{
		$("<li>").appendTo("#game_list").text(games[g].id+": "+games[g].name);
		console.log(games[g].id+"\t"+games[g].name);
	}
	return games.length;
}};
