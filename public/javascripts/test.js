var constructors = {};
var lobby, game;
initClass = function(name, class_descriptor_function) {
    var constructor = function() {
        this.type = name;
	    var _callbacks = {}, _data = {};
	    class_descriptor_function.apply(this, arguments);
	    for(key in this)
	    {
		    _callbacks[key] = this[key].callback;
		    _data[key] = this[key.data];
	        if (_callbacks[key])
	        {
		        this[key] = function()
		        {
					console.log({type: this.type, command: this.key, query: arguments[0]});
			        socket.emit("interface", {type: this.type, command: this.key, query: arguments[0]});
		        }.bind({key: key, type: name});
	        }
	    }
    }
    constructors[name] = constructor;
    return constructor;
}

var socket;
$(function()
{
	socket = io.connect("http://localhost:1337");
	socket.on("message", function(message) {
		console.log(message);
	});
	objects = {};

	lobby = new Lobby();
	lobby.list();

	/*$("button").click(function(button)
	{
		$.get("/interface"+$(button.target).attr("action"), function(result) {
			console.log(result);
		});
	});*/
    /*$.get("/init", function(data) {
        for(key in data) {
            if (constructors[data[key].type])
            {
                if (!objects[data[key].type])
                    objects[data[key].type] = [];
                objects[data[key].type].push(new constructors[data[key].type](data[key]));
            }
        };
    });*/
});

