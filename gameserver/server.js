interface = require("./interface");
Game = require("./game").Game;
Lobby = require("./lobby").Lobby;


var app, game;
exports.start = function(_app)
{
	app = _app;
	initialize_routes();
	lobby = new Lobby();

}

init = function(req, res) {

}


initialize_routes = function()
{
	app.get('/init', init);
	app.get('/interface/:type/:id/:command', interface.interface);
	app.get('/interface/:type/:command', interface.interface);
}