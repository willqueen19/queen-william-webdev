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
            vm.userId    = parseInt($routeParams[uid]);
            vm.websiteId = parseInt($routeParams[wid]);

            function init() {
                var promise = PageService.findPageByWebsiteId(vm.websiteId);
                promise
                    .success(function(pages) {
                        vm.pages = pages;
                    })
            }
            init();
        }

        function  NewPageController($routeParams, PageService, $location) {
            var vm = this;
            vm.userId    = parseInt($routeParams[uid]);
            vm.websiteId = parseInt($routeParams[wid]);
            vm.createPage = createPage;

            function init() {
                var promise = PageService.findPagesByWebsiteId(vm.websiteId);
                promise
                    .success(function(pages){
                        vm.pages = pages;
                    });
            }
            init();

            function createPage(page) {
                page._id = (new Date()).getTime();
                page.websiteId = websiteId;
                PageService
                    .createPage(websiteId, page)
                    .success(function () {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                    });
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
                PageService
                    .updatePage(pageId, page)
                    .success(function () {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                });
            }

            function removePage(pid) {
                PageService
                    .deletePage(pid)
                    .success(function () {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                });
            }
        }
})();