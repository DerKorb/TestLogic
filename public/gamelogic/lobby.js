Lobby = function(name)
{
	this.games = [];
	this.type = "Lobby";
	this.list = {callback: function(games){
		$("#game_list").empty();
		for (g in games)
		{
			$("<li>").appendTo("#game_list").text(games[g].id+": "+games[g].name);
			console.log(games[g].id+"\t"+games[g].name);
		}
		return games.length;

	}};

	this.join = {callback: function(_game) {

	}};

	this.create = {callback: function(_game) {

	}};

	this.update = {

	}

	this.login = {callback: function(result) {
		console.log(result);
	}};
	client.networkObject.call(this, arguments);
	//setInterval(this.list, 1000);
};