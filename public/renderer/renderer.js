var materials =
{
	lightblue: new THREE.MeshBasicMaterial({color: "lightblue"}),
	blue: new THREE.MeshBasicMaterial({color: "blue"}),
	red: new THREE.MeshBasicMaterial({color: "red"})
}

var threeJSModule = function()
{
	var options = this;
	this.init = function() {
		var self = this;
		if (self.canvas && $(self.target)) {
			this.canvas = $("<div>").css("width", 1000).css("height", 500);
			this.canvas.addTo = function(target2)
			{
				$(self.html).appendTo(target2 ? target2.find(self.target) : self.target);
			}
			self.html = self.canvas;

			this.emit("html", this.canvas);
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(30, this.canvas.innerWidth() / this.canvas.innerHeight(), 1, 10000);
			//*this.camera.position.y = 50;
			this.camera.position.y = 120;
			this.camera.position.z = 250;
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
			var geometry2 = new THREE.CylinderGeometry( self.regular.radius+0.7, self.regular.radius, 1, self.regular.n, 1 );
			var cylinder = new THREE.Mesh( geometry, materials["lightblue"] );
			cylinder.position = this.position;
			this.node.add( cylinder );
			cylinder = new THREE.Mesh( geometry2, materials["blue"] );
			cylinder.position = this.position;
			cylinder.position.y+=0.1;
			this.node.add( cylinder );
		}
		if (this.cube) {
			var geometry = new THREE.CubeGeometry( self.cube.w, self.cube.h, self.cube.l);
			var cylinder = new THREE.Mesh( geometry, materials["lightblue"] );
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