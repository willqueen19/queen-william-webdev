/**
 * Created by willqueen on 11/27/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel  = mongoose.model("PageModel", PageSchema);

    var api = {
        "createPage" : createPage,
        "findPageByWebsiteId" : findPageByWebsiteId,
        "findPageById" : findPageById,
        "updatePage" : updatePage,
        "deletePage": deletePage,
        "setModel" : setModel


    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function (pageOjb) {
                model.pageModel
                    .findPageByWebsiteId(websiteId)
                    .then(function (websiteObj) {
                        pageOjb._website = websiteObj._id;
                        pageOjb.save();
                        websiteObj.pages.push(pageOjb);
                        return websiteObj.save();
                    }, function (error) {
                        console.log(error);
                    })
            })
    }


    function findPageByWebsiteId(websiteId) {
        return PageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findPageById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name: page.name,
                    title: page.title,
                    description: page.description
                }
            )
    }

    function deletePage(pageId) {
        PageModel
            .remove({_id: pageId})
    }

}