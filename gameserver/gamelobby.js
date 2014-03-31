var Admiral = require("./admiral").Admiral;
var Player = require("./player").Player;
exports.Admiral = Admiral;
exports.Player = Player;

exports.GameLobby = function(name) {
	this.type = "GameLobby";
	var admirals = [];
	this.players = {};
	this.name = name ? name : "game without a name";
	this.displayModule = "htmlModule";
	this.template = "li>{"+this.name+"}+button#delete{delete this game}+button#join{join this game}+button#start{start this game}+ul#player_list";
	this.target = "#game_list";
	this.isChild = true;
	this.host = false;
	var self = this;
	this.interface = {
		start: "start a new game",
		join: "join the game",
		delete: "delete the game"
	};

	this.start = function(player) {
		if (player.playerName != self.host)
			return {error: "only host can start this game"};
		return {};
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
		self.set({host: player.playerName});
		return {message: "success"};
	}

	require("./server").networkObject.call(this, arguments);
};