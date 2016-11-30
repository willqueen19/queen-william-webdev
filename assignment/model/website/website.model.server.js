/**
 * Created by willqueen on 11/27/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        "createWebsite" : createWebsite,
        "findWebsitesForUser" : findWebsitesForUser,
        "findWebsiteById" : findWebsiteById,
        "updateWebsite" : updateWebsite,
        "deleteWebsite" : deleteWebsite,
        "setModel": setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    function findWebsitesForUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }
    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        userObj.websites.push(websiteObj);
                        return userObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }
    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }
    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove({_id: websiteId})
    }

};