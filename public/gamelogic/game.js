Game = initClass("game", function()
{
	this.start = {callback: function(games){
		if (games.error)
			return;

		$("#game_list").empty();
		for (g in games)
			$("<li>").appendTo("#game_list").text(games[g].id+": "+games[g].name);

	}};
});