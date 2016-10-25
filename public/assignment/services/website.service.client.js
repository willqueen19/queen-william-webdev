/**
 * Created by willqueen on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "userId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "userId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "userId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "userId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "userId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "userId": "234", "description": "Lorem" }
        ];
        var api = {
            "createWebsite"      : "createWebsite",
            "findWebsiteByUser"  : "findWebsiteByUser",
            "findWebsiteById"    : "findWebsiteById",
            "updateWebsite"      : "updateWebsite",
            "deleteWebsite"      : "deleteWebsite"
        };
        return api;
        function createWebsite(userId, website) {
            var uId = userId;
            var w = website;
            w.userId = uId;
            websites.push(w);
            return websites;
        }
        function findWebsiteByUser(userId) {
            var result = [];
            for(var w in websites) {
                if(websites[w].userId === userId) {
                    result.push(websites[w]);
                }
            }
            return result;
        }
        function findWebsiteById(wid) {
            for (var w in websites) {
                website = websites[w];
                if (website._id === wid) {
                    return websites[w];
                }
            }
            return null;
        }
        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w] = website;
                }
            }
        }
        function deleteWebsite(websiteId) {
            for (var w in websites) {
                website = websites[w];
                if(website._id = websiteId) {
                    websites.splice(websites.indexOf(w), 1);
                }
            }
            return websites;
        }


    }
})();


