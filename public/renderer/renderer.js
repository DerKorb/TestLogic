var renderer = function(parent)
{
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
	this.camera.position.y = 50;
	this.camera.position.z = 1500;
	this.renderer = renderer = new THREE.WebGLRenderer( { antialias: true } );
	this.scene.add( this.camera );
	if (parent)
	{
		renderer.setSize( parent.innerWidth, parent.innerHeight );
		parent.appendChild( this.renderer.domElement );
	}
}

renderer.renderObject = function()
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
		var args = [].slice.call(arguments);
		args.shift();
		for(l in self._listeners[tag])
			self._listeners[tag][l].apply(this, args[0]);
	}
	this.group = THREE.Object3D();
}