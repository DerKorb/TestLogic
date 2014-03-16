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
			        $.get.apply(null, ["/interface/"+this.type+"/"+this.key, arguments[0], this.callback]);
		        }.bind({key: key, callback: _callbacks[key], type: name});
	        }
	    }
	    this.help = function() {
		    $.get.apply(null, ["/interface/"+this.type+"/help", arguments[0], function(help)
		    {
			   console.log(help);
		    }]);
	    }
    }
    constructors[name] = constructor;
    return constructor;
}

$(function()
{
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

