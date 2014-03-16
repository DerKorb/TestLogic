var ids = {};
var pools = {};
var interface = {};

exports.initClass = function(name, class_descriptor_function) {
	ids[name] = 1;
	pools[name] = {};
	return function() {
		this.id = ids[name]++;
		this.type = name;
		class_descriptor_function.apply(this, arguments);
		pools[name][this.id] = this;
	}
}

exports.interface = function(data)
{
	if (!pools[data.type])
		return res.send({error: "unknown interface"});

	if (!pools[data.type][1].interface[data.command])
		return res.send({error: "unknown command"});

	if (!data.id)
	{
		result = pools[data.type][1][data.command].call(null,data.query);
		return result;
	}

	//res.send(a.interface[req.params.command]());
};