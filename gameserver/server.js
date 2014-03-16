interface = require("./interface");
io = require('socket.io').listen(1337, {log: false});
Game = require("./game").Game;
Lobby = require("./lobby").Lobby;


var app, game;
exports.start = function(_app)
{
	io.sockets.on("connection", function(socket) {
		socket.emit("message", "connected");
		socket.on("interface", function(data) {
			console.log("check");
			io.emit("message", interface.interface(data));
		});
	});

	app = _app;
	//initialize_routes();
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