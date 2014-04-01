function htmlModule()
{
	var self = this;
	this.init = function()
	{
		if (self.template)
		{
			self.html = $.zc(self.template, {});
			self.html.addTo = function(target2)
			{
				$(self.html).appendTo(target2 ? target2.find(self.target) : self.target).find("button").click(function(event)
				{
					self[event.target.id].call(self);
				});
			}

			if (!self.isChild)
				self.html.addTo();
		}
	}

	this.spawn = function(spawnling)
	{
		console.log(spawnling.html);
		if (spawnling.target && spawnling.html)
			spawnling.html.addTo(self.html);
	}

	this.delete = function()
	{
		self.html.remove();
	}

	this.displayModule.update = function()
	{

	}
	return this;
}

