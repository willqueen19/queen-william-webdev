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
                if(user === null) {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + user._id);
                }
            }
        }

        function  RegisterController() {
            var vm = this;
            vm.register = register;

            function register(username, password, password2) {
                if (username === undefined || password === undefined || password2 === undefined) {
                    vm.error = "Fields cannot be left blank"
                } else if (password !== password2) {
                    vm.error = "Passwords do not match"
                } else {
                    var user = {
                        _id: Date.now(),
                        username: username,
                        password: password,
                        firstName: "first",
                        lastName: "last"

                    };
                    UserService.createUser(user);
                    $location.url("/user/" + user._id);


                }
            }
        }

        function  ProfileController() {
            var vm = this;
            vm.userId = $routeParams["userId"];
            function init() {
                vm.user = UserService.findUserById(vm.userId);
            }
            init();
        }
})();