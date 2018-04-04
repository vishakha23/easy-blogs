angular.module('iBlog')
    .component('home', {
        templateUrl: 'app/component/Home/HomeTemplate.html',
        bindings: {},
        controller: function (postService, msgDialogService, $state) {

            var ctrl = this;

            ctrl.posts = null;
            ctrl.postSize = {};
            this.$onInit = function () {
                postService.getAllPosts().then(function (data) {
                    ctrl.posts = data;
                })
            };
            this.onPostSelect = function (post) {
                $state.go("post", {
                    "postId": post.id
                }, {
                    reload: true
                });
            }

            this.filterLeftPosts = function (post) {
                return post.id > 10 && post.id % 2 == 0;
            }

            this.filterRightPosts = function (post) {
                return post.id > 10 && post.id % 3 == 0;
            }

            this.filterBottomPosts = function (post) {
                return post.id > 1 && post.id % 7 == 0;
            }
        }
    });
