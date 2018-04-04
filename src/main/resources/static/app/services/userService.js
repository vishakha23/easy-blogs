angular.module('iBlog').factory('userService', function ($resource, $q, $http, store) {
    var userService = {}

    userService.getUser = function (postId) {
        var defer = $q.defer();
        $http.get('/users/' + postId).
        then(function (response) {
            defer.resolve(response.data);
        }).catch(defer.reject);
        return defer.promise
    }

    var isLoggedIn = false;

    userService.isLoggedIn = function () {
        if (isLoggedIn || store.get("current_user")) {
            return true;
        } else {
            return false;
        }
    }
    userService.logout = function () {
        isLoggedIn = false;
        store.remove("current_user");
    }

    userService.login = function (userName, password) {
        var defer = $q.defer();
        var data = {
            "username": userName,
            'password': password
        };
        $http.post('/users/login', data).
        then(function (response) {
            isLoggedIn = true;
            defer.resolve(response.data);
        }).catch(defer.reject);
        return defer.promise
    }
    return userService;
});
