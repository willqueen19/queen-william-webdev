/**
 * Created by willqueen on 10/21/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

        function  PageListController($routeParams, PageService) {
            var vm = this;
            var userId    = parseInt($routeParams[uid]);
            var websiteId = parseInt($routeParams[wid]);

            function init() {
                vm.pages = PageService.findPageByWebsiteId(websiteId);
            }
        }
        function  NewPageController($routeParams, PageService, $location) {
            var vm = this;
            var userId    = parseInt($routeParams[uid]);
            var websiteId = parseInt($routeParams[wid]);
            vm.createPage = createPage;

            function init() {
                vm.pages = PageService.findPagesByWebsiteId(websiteId);
            }
            init();

            function createPage(page) {
                page._id = (new Date()).getTime();
                page.websiteId = websiteId;
                console.log(page);
                PageService.createPage(page);
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
        }
        function  EditPageController($routeParams, PageService, $location) {
            var vm = this;
            var userId    = parseInt($routeParams.uid);
            var websiteId = parseInt($routeParams.wid);
            var pageId    = parseInt($routeParams.pid);
            vm.updatePage = updatePage;
            vm.removePage = removePage;

            function init() {
                vm.page = PageService.findPageById(pageId);
            }
            init();

            function updatePage(page) {
                PageService.updatePage(pageId, page);
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }

            function removePage(pid) {
                PageService.deletePage(pid);
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
        }

})();