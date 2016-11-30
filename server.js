var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

module.exports = function (app) {
    var multer = require('multer');
    var upload = multer ({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function  uploadImage (req, res) {
        var widgetId      = req.body.widgetId
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;
        var path          = myFile.path;
        var destination   = myFile.destination;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        // new file name in upload folder
                 // full path of uploaded file
          // folder where file is saved to

    }
}