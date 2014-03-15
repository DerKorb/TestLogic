initClass = function(name, params) {
    var constructor = function() {
        this.type = name;
        this.id = Math.random();
        for(key in params)
        {
            console.log(key);
            this[key] = params[key];
        }
    }
    return constructor;
}

Admiral = initClass("admiral", {
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    interface: {
        move: function(x,y,z)
        {
            return {ok: 0};
        }
    }
});


var game = {admirals: {1: new Admiral()}};

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