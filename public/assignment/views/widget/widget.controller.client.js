/**
 * Created by willqueen on 10/21/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

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
            var promise = WidgetService.findWidgetByPage(vm.pid);
            promise
                .success(function(widgets){
                    vm.widgets = widgets;
                })
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
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        init();

        function updateWidget() {
            if ((vm.widget.name != null) && (vm.widget.size != null) && (vm.widget.text != null)) {
                WidgetService
                    .updateWidget(vm.wgid, vm.widget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                            vm.success = "Widget successfully updated";
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                        vm.success = "Widget successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }

})();