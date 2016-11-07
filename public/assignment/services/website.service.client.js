/**
 * Created by willqueen on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "userId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "userId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "userId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "userId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "userId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "userId": "234", "description": "Lorem" }
        ];
        var api = {
            "createWebsite"      : createWebsite,
            "findWebsiteByUser"  : findWebsiteByUser,
            "findWebsiteById"    : findWebsiteById,
            "updateWebsite"      : updateWebsite,
            "deleteWebsite"      : deleteWebsite
        };
        return api;
        function deleteWebsite(wid) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    websites.splice(w, 1);
                }
            }
        }

        function updateWebsite(wid, website) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    websites[w] = website;
                }
            }
        }

        function createWebsite(uid, website) {
            var url = "/api/user/"+uid+"/website";
            return $http.post(url, website);
        }

        function findWebsiteById(wid) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    return websites[w];
                }
            }
            return null;

        }

        function findWebsiteByUser(uid) {
            var url = "/api/user/"+uid+"/website";
            return $http.get(url);
        }


    }
})();


