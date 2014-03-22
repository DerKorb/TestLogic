
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('lobby');
};

exports.template = function(req, res){
  res.render('templates/'+req.param("name"));
};