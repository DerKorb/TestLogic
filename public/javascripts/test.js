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
			        var data = {
				        type: this.type,
				        command: this.key,
				        query: arguments[0]
			        }
			        client._socket.emit("interface", data);
		        }.bind({key: key, callback: this._callbacks[key], type: name});
	        }
	    }
    }
    constructors[name] = constructor;
    return constructor;
}

var help = function() {
	console.log("game engine console");
	console.log("objects:");
	console.log("objects:");

}