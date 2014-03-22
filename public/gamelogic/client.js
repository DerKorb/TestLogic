var pools = {};
var templates = {};

var Client = function(options)
{
	this.options = options;
	this.spawn = options.spawn;
	this.objects = {};
	this.initConnection();
};
Client.prototype.constructor = Client;

Events = function()
{
    var self = this;
    this._listeners = {};
    this.on = function(tag, callback) {
        if (!self._listeners[tag])
            self._listeners[tag] = [];
        this._listeners[tag] = [callback].concat(self._listeners[tag]);
    }

    this.emit = function()
    {
        var tag = arguments[0];
        arguments = $.makeArray(arguments);
        arguments.shift();
        for(l in self._listeners[tag])
            self._listeners[tag][l].apply(this, arguments);
    }
}

Client.prototype.networkObject = function(parent) {
	var self = this;
	if (this.template)
	{
		var target = false;
		if(this.template.indexOf("->")>0)
		{
			target = this.template.split("->")[0];
			this.template = this.template.split("->")[1];
		}
		this.html = $.zc(this.template, {});
		this.html.addTo = function(target2)
		{
			$(self.html).appendTo(target2).find("button").click(function(event)
			{
				console.log("click", self, event);
				self[event.target.id].call(self);
			});
		}


		if (target)
			this.html.addTo(target);
		else
		{
			this.emit("html", this.html);
		}
	}
	this._spawn = function(spawnling) {
		if (!self[spawnling.type])
			self[spawnling.type] = [];
		self[spawnling.type].push(spawnling);
        self.emit("spawn", spawnling);
		return spawnling;
	}

    if (parent[0] && parent[0].type)
    {
        console.log("creating ", parent[0].type);
        for (key in parent[0])
        {
            if (parent[0][key].type)
            {
                this._spawn(new window[parent[0][key].type](parent[0][key]));
            }
            else if (typeof(parent[0][key]) == "object")
            {
                for(id in parent[0][key])
                {
                    if (parent[0][key][id] && parent[0][key][id].type != "undefined" && window[parent[0][key][id].type])
                    {
                        this._spawn(new window[parent[0][key][id].type](parent[0][key][id]));
                    }
                }
            }
            else
                this[key] = parent[0][key];
        }

    }

	var _data = {};
	for(key in self.interface)
	{
		self[key] = function()
		{
			var data = {
				type: this.type,
				command: this.key,
				query: arguments[0]
			}
			client._socket.emit("interface", data);
		}.bind({key: key, type: self.type});
	}
}
Client.prototype.initConnection = function()
{
	var self = this;
	var socket = io.connect("http://localhost:1337");

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
		if (typeof(self[data.type].interface[data.command]) == "function")
			self[data.type].interface[data.command].call(null, data.result);

	});
	socket.on("object", function(object) {
		console.log("object", object);
		if (!self[object.type])
			self[object.type] = {};

		if (!pools[object.type])
			pools[object.type] = {};

		if (object.singleton)
		{
			self[object.type] = new window[object.type](object);
			pools[object.type] = self[object.type];
		}
		else
		{
			self[object.type][object.id] = new window[object.type](object);
			pools[object.type][object.id] = self[object.type][object.id];
		}

		if (typeof(self.spawn) == "function")
			self.spawn.call(self, object);
	});
	socket.on("spawn", function(spawn) {
		if (spawn.singleton)
			console.log(spawn.type, ": spawned", spawn.object.type, "["+spawn.object.id+"]");
		else
			console.log(spawn.type, "["+ spawn.id +"]: spawned", spawn.object.type, "["+spawn.object.id+"]");
		if (!pools[spawn.object.type])
			pools[spawn.object.type] = {};
		if (pools[spawn.type].type)
			pools[spawn.object.type][spawn.object.id] = pools[spawn.type]._spawn(new window[spawn.object.type](spawn.object));
		else
			pools[spawn.object.type][spawn.object.id] = pools[spawn.type][spawn.id]._spawn(new window[spawn.object.type](spawn.object));

	});

	this._socket = socket;
}
var client;
$(function() {
	client = new Client({spawn: function(object) {
			if (object.type == "Lobby")
			{
				this.Lobby.login({user: "DerKorb", pwd: "asdfg"});
			}
	}});
});


