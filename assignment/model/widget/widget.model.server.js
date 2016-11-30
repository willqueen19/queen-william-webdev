/**
 * Created by willqueen on 11/27/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        "createWidget" : createWidget,
        "findWidgetByPage" : findWidgetByPage,
        "findWidgetById" : findWidgetById,
        "updateWidget" : updateWidget,
        "deleteWidget" : deleteWidget,
        "reorderWidget" : reorderWidget,
        "setModel" : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    function findWidgetByPage(pageId) {
        return WidgetModel.find({_page: pageId});
    }
    function findWidgetById(widgetId) {
        return WidgetModel.findWidgetById(widgetId);
    }
    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(function(widgetObj){
                model.pageModel
                    .findPageById(pageId)
                    .then(function(pageObj){
                        widget._page = pageObj._id;
                        widgetObj.save();
                        pageObj.widgets.push(widgetObj);
                        return pageObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }
    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted,
                }
            );
    }
    function deleteWidget(widgetId) {
        return WidgetModel
            .remove({_id: widgetId})
    }

    function reorderWidget(pageId, start, end) {

    }

};