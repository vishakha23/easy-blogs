angular.module('iBlog')
    .component('post', {
        templateUrl: 'app/component/Post/PostTemplate.html',
        bindings: {},
        controller: function (postService, msgDialogService, $stateParams, $state, $sce, store) {
            var ctrl = this;
            this.newComment = null;
            this.$onInit = function () {
                postService.getPost($stateParams.postId).then(function (data) {
                    if (!data) {
                        msgDialogService.showError("Post does not exist !");
                    }
                    ctrl.currentPost = data;
                }).catch(function (err) {
                    msgDialogService.showError("Post does not exist !");
                });
                postService.getAllPosts().then(function (data) {
                    ctrl.posts = data;
                })
            };


            var noComments = true;

            if (ctrl.comments == undefined) {
                this.noComments = false;
            } else {
                this.noComments = true;
            }

            var viewComments = false;
            this.onCommentCLick = function () {

                this.viewComments = true;
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
                if (!store.get('current_user')) {
                    msgDialogService.showError("Please log-in to comment !");
                    return;
                }
                postService.addComment(createComment()).then(function (data) {
                    msgDialogService.showInfo("Send comment !");
                }).catch(function (err) {
                    msgDialogService.showError("Something went wrong !");
                });
            }
            this.filterRelatedArticles = function (post) {
                return (post.id != ctrl.currentPost.id) && (post.id % 11 == 0);
            }

        }
    });
