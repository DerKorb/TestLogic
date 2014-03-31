var threeJSModule = function(options)
{
	this.init = function() {
		console.log("Init");
		console.log(options);
		if (options.canvas && $(options.target)) {
			this.canvas = $("<div>").css("width", 1000).css("height", 500).css("border", "1px solid red").appendTo(options.target);
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(30, this.canvas.innerWidth() / this.canvas.innerHeight(), 1, 10000);
			this.camera.position.y = 50;
			this.camera.position.z = 1500;
			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.scene.add(this.camera);
			this.renderer.setSize(this.canvas.innerWidth(), this.canvas.innerHeight());
			this.canvas.append($(this.renderer.domElement));
		}

		this.node = new THREE.Object3D();
	}

	this.spawn = function(spawnling)
	{
		if (spawnling.node)
			this.node.add(spawnling.node);
	}
}