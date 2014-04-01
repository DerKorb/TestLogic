var threeJSModule = function()
{
	var options = this;
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
		var self = this;
		if (self.canvas && $(self.target)) {
			this.canvas = $("<div>").css("width", 1000).css("height", 500).css("border", "1px solid red");
			this.canvas.addTo = function(target2)
			{
				$(self.html).appendTo(target2 ? target2.find(self.target) : self.target);
			}
			self.html = self.canvas;

			this.emit("html", this.canvas);
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(30, this.canvas.innerWidth() / this.canvas.innerHeight(), 1, 10000);
			//*this.camera.position.y = 50;
			this.camera.position.y = 200;
			this.camera.position.z = 0;
			this.camera.lookAt(new THREE.Vector3(0,0,0));
			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.scene.add(this.camera);
			this.renderer.setSize(this.canvas.innerWidth(), this.canvas.innerHeight());
			this.canvas.append($(this.renderer.domElement));
			this.node = new THREE.Object3D();
			this.scene.add(this.node);
			window.setInterval(function()
			{
				self.renderer.render(self.scene, self.camera);
			}, 40);
		}
		else
			this.node = new THREE.Object3D();

		if (this.regular) {
			var geometry = new THREE.CylinderGeometry( self.regular.radius, self.regular.radius, 2, self.regular.n, 1 );
			var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
			var cylinder = new THREE.Mesh( geometry, material );
			cylinder.position = this.position;
			this.node.add( cylinder );

		}
	}

	this.spawn = function(spawnling)
	{
		if (spawnling.node)
			this.node.add(spawnling.node);
	}
	return this;
}