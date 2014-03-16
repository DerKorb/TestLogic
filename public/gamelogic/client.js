$(function()
{
	initConnection();
	objects = {};
	lobby = new Lobby();
	lobby.login({user: "DerKorb", pwd: "asdfg"});
	lobby.list();
});

