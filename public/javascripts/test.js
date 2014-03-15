var constructors = {};

initClass = function(name, params) {
    var constructor = function() {
        this.type = name;
        for(key in params)
            this[key] = function(data) {
                $.get("/interface/"+this.type+"/"+key, data, params[key].callback);
            };
    }
    constructors[name] = constructor;
    return constructor;
}


Admiral = initClass("admiral",
{
    move: {target: "enemy unit", callback: function(data){
        console.log(data);
    }}
});

a = new constructors["admiral"]();
objects = {};
$(function()
{
    $.get("/init", function(data) {
        for(key in data) {
            if (constructors[data[key].type])
            {
                if (!objects[data[key].type])
                    objects[data[key].type] = [];
                objects[data[key].type].push(new constructors[data[key].type](data[key]));
            }
        };
    });
});

