angular.module('iBlog')
    .component('login', {
        templateUrl: 'app/component/login/loginTemplate.html',
        bindings: {
            userId: '<',
            password: '<'
        },
        controller: function ($http, $state, userService, msgDialogService, $state, store, $rootScope) {

            var ctrl = this;
            this.user = null;
            this.login = function () {
                userService.login(this.userId, this.password).then(function (response) {
                    ctrl.password = null;
                    ctrl.userId = null;

                    if (response.result == "success") {

                        ctrl.user = response.user;

                        store.set('user_secret', response.token);
                        store.set('current_user', ctrl.user);

                        $rootScope.$broadcast('user:login');
                        $state.go('createPost', {
                            "currentUser": response.user
                        });

                    } else {
                        msgDialogService.showError("Authetication Failed !");
                    }
                }).catch(function (error) {
                    // if authentication was not successful. Setting the error message.
                    msgDialogService.showError("Authetication Failed !");
                });
            }

        }
    });
