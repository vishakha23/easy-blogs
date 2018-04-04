angular.module('iBlog')
    .component('createPost', {
        templateUrl: 'app/component/createPost/createPostTemplate.html',
        bindings: {},
        controller: function (postService, msgDialogService, $state, $stateParams, store) {
            var ctrl = this;
            this.newComment = null;

            this.$onInit = function () {
                ctrl.currentUser = $stateParams.currentUser || store.get('current_user');
                if (!ctrl.currentUser) {
                    $state.go('login');
                    ctrl.currentUser = store.get('current_user')
                }
                $('#post-body').wysihtml5({
                    toolbar: {
                        "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                        "emphasis": true, //Italics, bold, etc. Default true
                        "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                        "html": true, //Button which allows you to edit the generated HTML. Default false
                        "link": false, //Button to insert a link. Default true
                        "image": false, //Button to insert an image. Default true,
                        "color": false, //Button to change color of font  
                        "blockquote": true, //Blockquote  
                        "size": "sm" //default: none, other options are xs, sm, lg
                    }
                });
            };

            var content = null

            this.addPost = function () {
                if (!this.isValidForm()) {
                    msgDialogService.showError("Error")
                    return;
                }
                var newpost = {
                    "title": ctrl.newPost.title,
                    "imageUrl": ctrl.newPost.imageUrl,
                    "tagLine": ctrl.newPost.tagLine,
                    "content": $('#post-body').val(),
                    "user": ctrl.currentUser
                };

                postService.addPost(newpost).then(function (response) {
                    msgDialogService.showInfo("success!");
                    $state.go("post", {
                        "postId": response.id
                    });
                }).catch(function (error) {
                    // if authentication was not successful. Setting the error message.
                    msgDialogService.showError("Something went wrong !");
                });
            }

            this.isValidForm = function () {
                //check if all values are true if not return false;
                var content = $('#post-body').val();
                var isTitleValid = this.newPost.title == null || this.newPost.title == ""
                var isContentValid = content == ""
                var isImageUrlValid = this.newPost.imageUrl == null || this.newPost.imageUrl == ""
                var isTagLineValid = this.newPost.tagLine == null || this.newPost.tagLine == ""
                return !isTitleValid && !isContentValid && !isImageUrlValid && !isTagLineValid;
            }

            this.clearContent = function () {
                $('#post-body').data("wysihtml5").editor.clear();
                this.newPost.title = null
                this.newPost.imageUrl = null
                this.newPost.tagLine = null
            }
        }
    });
