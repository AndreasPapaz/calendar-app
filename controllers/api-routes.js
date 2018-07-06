module.exports = function(app){
    app.use('*', function(req, res){
      let dir = __dirname;
      let dirSplit = dir.split('controllers');
      dir = dirSplit[0];

      res.sendFile(dir + '/public/index.html');
    });
};
