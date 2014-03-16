var constructors = {};
var lobby, game;
var initClass = function(name, class_descriptor_function) {
    var constructor = function() {
        this.type = name;
	    this._callbacks = {};
	    var _data = {};
	    class_descriptor_function.apply(this, arguments);
	    for(key in this)
	    {
		    if (!this[key] || !this[key].callback)
		        continue;
		    this._callbacks[key] = this[key].callback;
		    _data[key] = this[key.data];
	        if (this._callbacks[key])
	        {
		        this[key] = function()
		        {
			        socket.emit("interface", {type: this.type, command: this.key, query: arguments[0]});
		        }.bind({key: key, callback: this._callbacks[key], type: name});
	        }
	    }
    }
    constructors[name] = constructor;
    return constructor;
}

var socket;
var initConnection = function()
{
	socket = io.connect("http://localhost:1337");
	socket.on("message", function(message) {
		if (message.message)
			console.log(message.type+"::"+message.command+" - "+message.message);
		else
			console.log(message);
	});
	socket.on("error", function(error) {
		console.log(error.type+"::"+error.command+" - "+error.message);
	});
	socket.on("result", function(data) {
		if (window[data.type]._callbacks[data.command])
			window[data.type]._callbacks[data.command](data.result);

	});
}