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
		return {error: "unknown interface"};

	if (!data.id)
		data.id = 1;

	if (!data.query)
		data.query = {};
	data.query.socketId = data.socketId;

	if (!pools[data.type][data.id])
		return {error: "object does not exist"};

	if (!pools[data.type][data.id].interface[data.command])
		return {error: "unknown command"};

	return pools[data.type][data.id][data.command].call(null,data.query);
};