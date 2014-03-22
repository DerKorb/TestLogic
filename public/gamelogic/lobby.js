Lobby = function(object)
{
    Events.call(this);
	var self = this;
	this.type = "Lobby";
    this.on("spawn", function(object) {
        if (object.type == "Game")
        {
            $("<li>").appendTo("#game_list").text(object.id+": "+object.name);
        }
    });
    var myDiv = $("<div>").addClass(self.type).html($.zc("h1{Game Lobby &type}+button#create{create new game}+#game_list", {type: "test"})).appendTo("body");
	$(myDiv).find("button").click(function(event)
	{
		self[event.target.id].call(self);
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
