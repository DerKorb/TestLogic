GameLobby = function(_data)
{
	this.on("update", function(changes)
	{
		if (changes.host)
			console.log(this.html);
	})
};