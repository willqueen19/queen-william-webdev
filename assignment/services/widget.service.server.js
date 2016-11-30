/**
 * Created by willqueen on 11/6/16.
 */
module.export = function(app) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname + "/../../public/uploads" });

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/upload", upload.single("myFile"), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        //console.log(widgetId);
        var width         = req.body.width;
        //console.log(width);
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    widget.url = "/uploads/" + filename;
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

    function createWidget(req, res) {
        var pid = req.params._page;
        var widget = req.body;
        model
            .widgetModel
            .createWidget(pid, widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

    }

    function findWidgetByPageId(req, res) {
        var pid = req.params.pageId;
        model
            .widgetModel
            .findWidgetByPage(pid)
            .then(
                function(widgets) {
                    res.json(widgets);
                },
                function(error) {
                    res.status(400).send(error)
                }
            );

        //  for (var i in widgets) {
        //      if (widgets[i].pageId === pageId) {
        //          result.push(widgets[i]);
        //      }
        //  }
        // // console.log(result);
        //  res.send(result);
    }

    function findWidgetById(req, res) {
        var wgid = req.params._id;
        model
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params._id;
        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function(widget) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );


    }

    function deleteWidget(req, res) {
        var wgid = req.params._id;
        model
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }


}