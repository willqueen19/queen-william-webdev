/**
 * Created by willqueen on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService($http) {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        var api = {
            "createPage"          : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById"        : findPageById,
            "updatePage"          : updatePage,
            "deletePage"          : deletePage
        };
        return api;
        function deletePage(pid) {
            for (var p in pages) {
                if (pages[p]._id === pid) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pid, page) {
            for (var p in pages) {
                if (pages[w]._id === pid) {
                    pages[w] = page;
                }
            }
        }

        function createPage(wid, page) {
            var url = "/api/website/"+wid+"/page";
            return $http.post(url, page);
        }

        function findPageById(pid) {
            for (var p in pages) {
                if (pages[p]._id === pid) {
                    return pages[p];
                }
            }
            return null;

        }

        function findPageByWebsiteId(wid) {
            var url = "/api/website/"+wid+"/page";
            return $http.get(url);
        }

    } })();

