angular.module('iBlog').factory('postService', function ($resource, $q, $http) {
    var postService = {}

    postService.getAllPosts = function () {
        var defer = $q.defer();
        $http.get('/posts').
        then(function (response) {
            defer.resolve(response.data);
        }).catch(defer.reject);
        return defer.promise
    }
    postService.getPost = function (postId) {
        var defer = $q.defer();
        $http.get('/posts/' + postId).
        then(function (response) {
            defer.resolve(response.data);
        }).catch(defer.reject);
        return defer.promise
    }



    postService.addComment = function (comment) {
        var defer = $q.defer();
        $http.post('/posts/comments', comment).
        then(function (response) {
            defer.resolve(response.data);
        }).catch(defer.reject);
        return defer.promise
    }



    postService.addPost = function (newpost) {
        var defer = $q.defer();
        $http.post('/posts', newpost).
        then(function (response) {
            defer.resolve(response.data);
        }).catch(defer.reject);
        return defer.promise
    }

    //    postService.addLikes = function (postId) {
    //
    //        var post = this.getPost(postId);
    //        //        post.likes = post.likes++;
    //        //        posts.push(postId);
    //        return;
    //    }

    return postService;
});
