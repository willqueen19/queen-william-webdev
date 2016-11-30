/**
 * Created by willqueen on 11/27/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    // var PageSchema = require("../page/page.schema.server")();
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}],
        dateCreated: Date.now()
    }, {collection: "page"});
    return PageSchema;
};