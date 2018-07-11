module.exports = function(app) {
    // app.post('/delete', function(req, res) {
    //     Journal.remove({_id: req.body.id}, function(err, doc) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             console.log("This is the new doc from delete");
    //             console.log("==========================");
    //             // console.log(doc);
    //             res.send(doc);
    //         }
    //     });
    // });

    app.post('/signup', function(req, res) {
        var user = new User(req.body);

        user.save(function(err, doc) {
            if (err) {
                res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    app.post('/test', (req, res) => {
      console.log('===========================');
      console.log('===========================');
      console.log(req.body);
      console.log('===========================');
      console.log('===========================');
      //some orm to handle MONGODB
    });

    app.use('*', function(req, res) {
        console.log('=============');
        console.log('hitting the ALL path');
        console.log('=============');
        var dir = __dirname;
        var dirSplit = dir.split("controllers");
        dir = dirSplit[0];

        res.sendFile(dir + '/public/index.html');
    });

};
