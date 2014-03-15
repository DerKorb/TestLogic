interface = require("./interface");
Game = require("./game").Game;


var app, game;
exports.start = function(_app)
{
	app = _app;
	game = new Game();
	game.start(["korbi", "manu"]);
}


initialize_routes = function()
{
	app.get('/init', interface.init);
	app.get('/interface/:type/:id/:command', interface.interface);
	app.get('/interface/:type/:command', interface.interface);
}