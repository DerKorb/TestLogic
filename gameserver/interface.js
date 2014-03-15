exports.initClass = function(name, class_descriptor_function) {
	var injected_scope = {};
	var constructor = class_descriptor_function;
	console.log();


	/*function() {
		this.type = name;
		this.id = Math.random();
		for(key in params)
		{
			console.log(key);
			this[key] = params[key];
		}
	}*/
	return constructor;
}

exports.init = function(req, res)
{
	res.send(game);
};

exports.interface = function(req, res)
{
	if (!req.params.type == "admiral")
		return res.send({error: "unknown interface"});

	if (!a.interface[req.params.command])
		return res.send({error: "unknown command: "+req.params.command});

	res.send(a.interface[req.params.command]());
};