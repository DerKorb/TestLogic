var Admiral = require("./admiral").Admiral;
var Player = require("./player").Player;
exports.Admiral = Admiral;
exports.Player = Player;

exports.Game = function(name) {
	this.type = "Game";
	var admirals = [];
	this.players = {};
	this.name = name ? name : "game without a name";
	this.displayModule = "htmlModule";
	this.template = "li>{"+this.name+"}+button#delete{delete this game}+button#join{join this game}+ul#player_list";
	this.target = "#game_list";
	this.isChild = true;
	var self = this;
	this.interface = {
		start: "start a new game",
		join: "join the game",
		delete: "delete the game"
	};
	this.start = function(players) {
		for(p in players)
		{
			admirals.push(new Admiral({pos: {x: 0, y: 0, z: 0}}));
		}
	}

	this.join = function(player)
	{
		if (self.Player)
		{
			for (id in self.Player)
			{
				if (self.Player[id].name == player.playerName)
				{
					return {error: "already joined this game"};
				}
			}
		}
		self.spawn(new Player(player));
		return {message: "success"};
	}

	require("./server").networkObject.call(this, arguments);
};