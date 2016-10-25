/**
 * Created by willqueen on 10/21/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)

        function  WebsiteListController($routeParams, WebsiteService) {
            var vm = this;

            vm.userId = parseInt($routeParams['uid']);

            function init() {
                vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
            }
            init();
        }
        function  NewWebsiteController($routeParams, WebsiteService, $location) {
            var vm = this;
            var userId = parseInt($routeParams.uid);
            vm.createWebsite = createWebsite;

            function init() {
                vm.websites = WebsiteService.findWebsiteByUser(userId);
            }
            init();

            function createWebsite(website) {
                website._id = (new Date()).getTime();
                website.uid = userId;
                console.log(website);
                WebsiteService.createWebsite(website);
                $location.url("/user/"+userId+"/website");
            }
        }
        function  EditWebsiteController($routeParams, WebsiteService, $location) {
            var vm = this;
            var userId    = parseInt($routeParams.uid);
            var websiteId = parseInt($routeParams.wid);
            vm.updateWebsite = updateWebsite;
            vm.deleteWebsite = deleteWebsite;

            function init() {
                vm.website = WebsiteService.findWebsiteById(websiteId);
            }
            init();

            function updateWebsite(website) {
                WebsiteService.updateWebsite(vm.websiteId, website);
                $location.url("/user/"+userId+"/website");
            }

            function deleteWebsite(wid) {
                WebsiteService.deleteWebsite(wid);
                $location.url("/user/"+userId+"/website");
            }
    }
})();