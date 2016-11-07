/**
 * Created by willqueen on 10/21/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(username, password) {

                var user = UserService.findUserByCredentials(username, password);
                var userId = parseInt(user._id);

                if(user === null) {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + userId);
                }
            }
        }

        function  RegisterController($location, UserService) {
            var vm = this;
            vm.register = register;

            function register(username, password) {
                UserService
                    .createUser(username, password)
                    .success(function(user){
                        $location.url("/user/"+user._id);
                    })
                    .error(function (error) {

                    });
            }


        }

        function ProfileController($location, $routeParams, UserService) {
            var vm = this;

            vm.userId = parseInt($routeParams.uid);

            vm.updateUser = updateUser;
            vm.unregisterUser = unregisterUser;

            function init() {
                UserService
                    .findUserById(vm.userId)
                    .success(function(user){
                        if(user != '0') {
                            vm.user = user;
                        }
                    })
                    .error(function(){

                    });
            }
            init();

            function updateUser() {
                UserService.updateUser(vm.user);
            }

            function unregisterUser() {
                UserService
                    .unregisterUser(vm.user._id)
                    .success(function(){
                        $location.url("/login");
                    })
                    .error(function(){

                    });
            }
        }
})();