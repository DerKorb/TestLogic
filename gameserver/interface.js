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

exports.interface = function(req, res)
{
	if (!pools[req.params.type])
		return res.send({error: "unknown interface"});

	if (!pools[req.params.type][1].interface[req.params.command])
		return res.send({error: "unknown command"});

	if (!req.params.id)
		return res.send(pools[req.params.type][1][req.params.command].call(null,req.query));

	res.send(a.interface[req.params.command]());
};