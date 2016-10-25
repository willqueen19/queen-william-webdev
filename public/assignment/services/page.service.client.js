/**
 * Created by willqueen on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        var api = {
            "createPage"          : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById"        : "findPageById",
            "updatePage"          : "updatePage",
            "deletePage"          : "deletePage"
    };
        return api;
        function createPage(websiteId, page) {
            var wId = websiteId;
            var p = page;
            p.websiteId = wId;
            pages.push(p);
            return pages;
        }
        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages) {
                page = pages[p];
                if(page.websiteId = websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }
        function findPageById(pageId) {
            for(var p in pages) {
                page = pages[p];
                if(page._id = pageId) {
                    return page;
                }
            }
            return null;
        }
        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p] = page;
                }
            }
        }
        function deletePage(pageId) {
            for(var p in pages) {
                page = pages[p];
                if(page._id = pageId) {
                    pages.splice(pages.indexOf(p), 1);
                }
            }
        }

    } })();

