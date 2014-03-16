var constructors = {};
var lobby, game;
initClass = function(name, class_descriptor_function) {
    var constructor = function() {
        this.type = name;
	    this._callbacks = {};
	    var _data = {};
	    class_descriptor_function.apply(this, arguments);
	    for(key in this)
	    {
		    this._callbacks[key] = this[key].callback;
		    _data[key] = this[key.data];
	        if (this._callbacks[key])
	        {
		        this[key] = function()
		        {
					console.log({type: this.type, command: this.key, query: arguments[0]});
			        socket.emit("interface", {type: this.type, command: this.key, query: arguments[0]});
		        }.bind({key: key, callback: this._callbacks[key], type: name});
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
	socket.on("error", function(error) {
		console.log("interface::"+error.type+"::"+error.command+" - "+error.message);
	});
	socket.on("result", function(data) {
		if (window[data.type]._callbacks[data.command])
			window[data.type]._callbacks[data.command](data.result);

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

