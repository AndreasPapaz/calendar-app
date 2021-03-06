module.exports = function(app, Appointment) {
    app.post('/appointment', (req, res) => {
      let appointment = new Appointment(req.body);

      appointment.save(function(err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.json(doc);
        }
      });
    });

    app.post('/get_appointment', (req, res) => {
      Appointment.findOne({
        Date: new Date(req.body.day)
      }, function(err, App){
        if (err) {
          console.log(err);
        } else {
          res.json(App);
        }
      });
    });

    app.post('/delete', (req, res) => {
      Appointment.remove({
        Date: new Date(req.body.Date)
      }, function(err, App){
        if (err){
          console.log(err);
        } else {
          res.json(App)
        }
      });
    });

    app.post('/update_appointment', (req, res) => {
      Appointment.update({
        Date: new Date(req.body.Date)
      }, {
        '$set': {
          body: req.body.body
        }
      }, function(err, App) {
        if (err){
          console.log(err);
        } else {
          res.json(App);
        }
      });
    });

    app.post('/calendar_fill', (req, res) => {
      Appointment.find({}, function(err, App){
        if (err){
          console.log(err);
        } else {
          res.json(App);
        }
      })
    });

    app.use('*', function(req, res) {
        var dir = __dirname;
        var dirSplit = dir.split("controllers");
        dir = dirSplit[0];

        res.sendFile(dir + '/public/index.html');
    });

};
