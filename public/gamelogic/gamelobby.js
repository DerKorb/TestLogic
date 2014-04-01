var GameLobby = function ()
{
	this.illustrate = function (changes)
	{
		if (changes.host != me)
			this.html.find("#start").hide();
		else
			this.html.find("#start").show();

		if (changes.host)
			this.html.find("li[html~='" + changes.host + "']").css("color", "blue");
	};
	this.illustrate(this);
	this.on("update", this.illustrate);
};

