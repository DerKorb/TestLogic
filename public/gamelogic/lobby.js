var me = "DerKorb";
Lobby = function (object)
{
	this.on("login", function (data)
	{
		me = data;
	});
}
