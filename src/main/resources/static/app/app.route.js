angular.module('iBlog').config(function ($stateProvider, $urlServiceProvider, $urlRouterProvider) {
    // State to view grooming
    $stateProvider.state('home', {
        url: '/home',
        views: {
            '': {
                component: 'home',
            },
            'main@home': {
                templateUrl: '/app/component/Home/HomeMainTemplate.html',
            }


        }
    });

    $stateProvider.state('post', {
        parent: 'home',
        url: '/post/:postId',
        views: {
            'main@home': {
                component: 'post',
            },
        },
    });

    $stateProvider.state('about', {
        url: '/about',
        component: 'about',
    });

    $stateProvider.state('login', {
        url: '/login',
        component: 'login',
    });

    $stateProvider.state('createPost', {
        url: '/createPost',
        component: 'createPost',
        params: {
            currentUser: null
        }
    });


    // What to do if no state is specified
    $urlServiceProvider.rules.otherwise({
        state: 'home'
    });


})
