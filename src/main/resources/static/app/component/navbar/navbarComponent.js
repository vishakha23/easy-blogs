angular.module('iBlog')
    .component('navbar', {
        templateUrl: 'app/component/navbar/navbarTemplate.html',
        bindings: {},
        controller: function (postService, msgDialogService, $state, store, userService, $rootScope, $scope) {

            ctrl = this;
            this.isLoggedIn = false;

            this.$onInit = function () {
                this.isLoggedIn = userService.isLoggedIn();
            };
            this.logout = function () {
                userService.logout();
                this.isLoggedIn = false;
                $state.go('login');
                $rootScope.$broadcast('user:logout')
            }

            this.getLogo = function () {
                return "assets/images/icon.png";
            }

            $scope.$on('user:login', function (event, data) {
                ctrl.isLoggedIn = true;
            });
        }
    });
