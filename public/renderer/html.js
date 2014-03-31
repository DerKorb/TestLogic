function htmlModule(self)
{
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
			else
				self.emit("html", self.html);

		}
	}

	this.spawn = function(spawnling)
	{
		if (spawnling.target && spawnling.html)
			spawnling.html.addTo(self.html);
	}

	this.delete = function()
	{
		self.html.remove();
	}

	this.update = function()
	{

	}
}

