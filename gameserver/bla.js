Bla = function() {
	this.type = "Bla";
	this.displayModule = "htmlModule";
	this.template = "#Bla>h1{Bla}";
	this.target = "#blas";
	require("./server").networkObject.call(this, arguments);
}

exports.Bla = Bla;
