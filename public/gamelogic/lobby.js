Lobby = initClass("lobby", function()
{
	this.list = {callback: function(games){
		if (games.error)
			return;

		$("#game_list").empty();
		for (g in games)
		{
			$("<li>").appendTo("#game_list").text(games[g].id+": "+games[g].name);
			console.log(games[g].id+"\t"+games[g].name);
		}

	}};

	this.create = {callback: function(id) {
		if (game.error)
			return console.log(game.error);

		console.log("created game", id);

	}};
});