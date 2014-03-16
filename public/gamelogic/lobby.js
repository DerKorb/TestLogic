Lobby = initClass("lobby", function()
{
	this.list = {callback: function(games){
		console.log(games);
		$("#game_list").empty();
		for (g in games)
		{
			$("<li>").appendTo("#game_list").text(games[g].id+": "+games[g].name);
			console.log(games[g].id+"\t"+games[g].name);
		}

	}};

	this.create = {callback: function(_game) {
		game = new Game(_game);
	}};

	this.update = {}

	this.login = {callback: function(result) {
		console.log(result);
	}};
	//setInterval(this.list, 1000);
});