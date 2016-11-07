/**
 * Created by willqueen on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget": createWidget,
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;
        function createWidget(pid, widget) {
            var url = "/api/page"+pid+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetById(wid) {
            for(var w in widgets) {
                if(widgets[w]._id === wid) {
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetByPageId(pid) {
            var url = "/api/page/"+pid+"/widget";
            return $http.get(url);
        }

        function updateWidget(wid, widget) {
            var url = "api/widget/"+wid;
            return $http.put(url, widget);
        }

        function deleteWidget(wid) {
            for (var w in widgets) {
                if (widgets[w]._id === wid) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();
