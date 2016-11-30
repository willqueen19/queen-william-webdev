/**
 * Created by willqueen on 11/6/16.
 */
module.export = function(app) {

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.send(widgets);

    }

    function findWidgetByPageId(req, res) {
        var pid = req.params.pageId;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pid) {
                result.push(widgets[w]);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var wgid = req.params._id;
        for(var w in widgets) {
            if(widgets[w]._id === wgid) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params._id;
        for(var w in widgets) {
            if(widgets[w]._id === wgid) {
                widgets[w] = widget;
            }
        }
        res.send(200);

    }

    function deleteWidget(req, res) {
        var wgid = req.params._id;
        for(var w in widgets) {
            if(widgets[w]._id === wgid) {
                widgets.splice(w, 1);
            }
        }
        res.send(200);
    }


}