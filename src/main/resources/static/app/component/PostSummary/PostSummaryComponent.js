angular.module('iBlog')
    .component('postSummary', {
        templateUrl: 'app/component/PostSummary/PostSummaryTemplate.html',
        bindings: {
            posts: "=",
            type: "@"
        },
        controller: function (postService, msgDialogService, $stateParams, $state, $sce) {
            var ctrl = this;
            this.onPostSelect = function (post) {
                $state.go("post", {
                    "postId": post.id
                });
            }

            this.filteredPosts = function () {
                if (!this.posts) {
                    return [];
                }
                var filteredPosts = ctrl.posts.filter(function (post) {
                    if (ctrl.type == "business") {
                        return post.id > 5 && post.id % 2 == 0;
                    } else if (ctrl.type == "popular") {
                        return post.id > 10 && post.id % 3 == 0;
                    } else if (ctrl.type == "related") {
                        return post.id > 1 && post.id % 7 == 0;
                    } else if (ctrl.type == "featured") {
                        return post.id > 1 && post.id % 7 == 0;
                    }
                });
                var n = 10;
                if (ctrl.type == "related") {
                    n = 5;
                } else if (ctrl.type == "featured") {
                    n = 9;
                }
                return filteredPosts.slice(0, n);
            }
        }
    });
