Lobby = function(name)
{
	this.games = [];
	this.type = "Lobby";
	client.networkObject.call(this, arguments);
}

Lobby.prototype.interface = {
	join: true,
	list: true,
	login: true
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
