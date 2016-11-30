/**
 * Created by willqueen on 11/7/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);
    // wam-sortable

    function wamSortable() {
        console.log("Hello from Sortable");
    }
})();