angular.module('iBlog')
    .component('post', {
        templateUrl: 'app/component/Post/PostTemplate.html',
        bindings: {},
        controller: function (postService, msgDialogService, $stateParams, $state, $sce, store, $scope) {
            var ctrl = this;
            this.newComment = null;
            this.showComments = false;
            this.isLoggedIn = false;
            this.$onInit = function () {
                this.isLoggedIn = store.get('current_user') && true;
                postService.getPost($stateParams.postId).then(function (data) {
                    if (!data) {
                        msgDialogService.showError("Post does not exist !");
                    }
                    ctrl.currentPost = data;
                    ctrl.showComments = ctrl.currentPost.comments && ctrl.currentPost.comments.length > 0;
                }).catch(function (err) {
                    msgDialogService.showError("Post does not exist !");
                });
                postService.getAllPosts().then(function (data) {
                    ctrl.posts = data;
                })
            };
            var currentInstance = this;
            $scope.$on('user:login', function (event, data) {
                currentInstance.isLoggedIn = true;
            });

            $scope.$on('user:logout', function (event, data) {
                currentInstance.isLoggedIn = false;
            });

            this.viewComments = false;
            this.onCommentCLick = function () {
                this.viewComments = !this.viewComments;
            }

            this.on = function (post) {
                $state.go("post", {
                    "postId": post.id
                }, {
                    reload: true
                });
            }


            var createComment = function (text) {
                var comment = {
                    "post": ctrl.currentPost,
                    "text": ctrl.newComment,
                    "user": store.get('current_user')
                };
                return comment;
            }
            this.to_trusted = function (html_code) {
                return $sce.trustAsHtml(html_code);
            }
            this.postComment = function () {
                postService.addComment(createComment()).then(function (data) {
                    $state.reload();
                }).catch(function (err) {
                    console.log("Something went wrong !");
                });
            }
            this.filterRelatedArticles = function (post) {
                return (post.id != ctrl.currentPost.id) && (post.id % 11 == 0);
            }

        }
    });
