/**
 * Created by willqueen on 10/21/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams,
                                  WidgetService, $sce, $timeout) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.pid = parseInt($routeParams['pid']);
        vm.wgid = parseInt($routeParams['wgid']);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            var promise = WidgetService.findWidgetsForPage(vm.pid);
            promise
                .success(function(widgets){
                    vm.widgets = widgets;
                })

            // var widgets = $(".wam-widgets")
            //     .sortable({
            //         axis: 'y'
            //     });
            // console.log(widgets);
        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController() {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

    }

    function EditWidgetController($routeParams,
                                  WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        init();

    }

})();