/**
 * Created by willqueen on 10/21/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

        function  WebsiteListController($routeParams, WebsiteService) {
            var vm = this;

            vm.userId = parseInt($routeParams['uid']);

            function init() {
                var promise = WebsiteService.findWebsitesForUser(vm.userId);
                promise
                    .success(function(websites){
                        vm.websites = websites;
                    });
            }
            init();

        }
        function  NewWebsiteController($routeParams, WebsiteService, $location) {
            var vm = this;
            var userId = parseInt($routeParams.uid);
            vm.createWebsite = createWebsite;

            function init() {
                var promise = WebsiteService.findWebsitesForUser(userId);
                promise
                    .success(function(websites){
                        vm.websites = websites;
                    });
            }
            init();

            function createWebsite(website) {
                website._id = (new Date()).getTime();
                website.uid = userId;
                WebsiteService
                    .createWebsite(userId, website)
                    .success(function () {
                        $location.url("/user/"+userId+"/website");
                    });
            }

        }
        function  EditWebsiteController($routeParams, WebsiteService, $location) {
            var vm = this;
            var userId    = parseInt($routeParams.uid);
            var websiteId = parseInt($routeParams.wid);
            vm.updateWebsite = updateWebsite;
            vm.removeWebsite = removeWebsite;

            function init() {
                vm.website = WebsiteService.findWebsiteById(websiteId);
            }
            init();

            function updateWebsite(website) {
                WebsiteService.updateWebsite(website);
                $location.url("/user/"+userId+"/website");
            }

            function removeWebsite(wid) {
                WebsiteService.removeWebsite(wid);
                $location.url("/user/"+userId+"/website");
            }
    }
})();