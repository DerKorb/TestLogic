var materials =
{
	lightblue: new THREE.MeshBasicMaterial({color: "lightblue"}),
	blue: new THREE.MeshBasicMaterial({color: "blue"})
}

var threeJSModule = function()
{
	var options = this;
	var self = this;
	this.init = function() {
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
			var geometry = new THREE.CubeGeometry(1,1,1);
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			//self.scene.add( cube );
			self.renderer.render(self.scene, self.camera);
			window.setInterval(function()
			{
			}, 40);
		}
		else
			this.node = new THREE.Object3D();

		if (this.regular) {
			/*var geometry = new THREE.CylinderGeometry( self.regular.radius, self.regular.radius, 2, self.regular.n, 1 );
			var cylinder = new THREE.Mesh( geometry, materials["lightblue"] );
			this.node.add( cylinder );*/
/*			//var geometry2 = new THREE.CylinderGeometry( self.regular.radius+0.7, self.regular.radius, 1, self.regular.n, 1 );
			//cylinder.position = this.position;
			//console.log(cylinder);
			this.node.add( cylinder );
			//cylinder = new THREE.Mesh( geometry2, materials["blue"] );
			//cylinder.position = this.position;
			//cylinder.position.y+=0.1;
			//this.node.add( cylinder );*/

		}
	}

	this.spawn = function(spawnling)
	{
		if (spawnling.node)
			this.node.add(spawnling.node);
	}
	return this;
}