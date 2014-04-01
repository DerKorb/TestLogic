var threeJSModule = function(options)
{
	console.log(this);
	this.createGeometry = function(n, circumradius) {
		var geometry = new THREE.Geometry(),
			vertices = [],
			faces = [],
			x;

		// Generate the vertices of the n-gon.
		for (x = 1; x <= n; x++) {
			geometry.vertices.push(new THREE.Vector3(
					circumradius * Math.sin((Math.PI / n) + (x * ((2 * Math.PI)/ n))),
					circumradius * Math.cos((Math.PI / n) + (x * ((2 * Math.PI)/ n))),
				0
			));
		}

		// Generate the faces of the n-gon.
		for (x = 0; x < n-2; x++) {
			geometry.faces.push(new THREE.Face3(0, x + 1, x + 2));
		}

		geometry.computeBoundingSphere();

		return geometry;
	}

	this.init = function() {
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
		if (this.regular) {
			var geometry = this.createGeometry(this.regular.n, this.regular.radius);
			var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:"#ff0000"}));
			this.node.add(mesh);

		}
	}

	this.spawn = function(spawnling)
	{
		if (spawnling.node)
			this.node.add(spawnling.node);
	}
	return this;
}