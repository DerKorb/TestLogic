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

$(function()
{
    $.get("/init", function(data) {
        console.log(data);
    });
});

