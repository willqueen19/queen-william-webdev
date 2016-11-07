/**
 * Created by willqueen on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser"            : createUser,
            "findUserById"          : findUserById,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser"            : updateUser,
            "deleteUser"            : deleteUser
    };
        return api;

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);;
        }
        function findUserById(uid) {
            var url = "/api/user/"+uid;
            return $http.get(url);
        }
        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }
        function updateUser(uid, user) {
            var url = "/api/user/"+uid;
            return $http.put(url, user);
        }
        function deleteUser(uid) {
            var url = "/api/user/"+uid;
            return $http.delete(url);
        }
    } })();

