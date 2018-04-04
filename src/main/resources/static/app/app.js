angular.module('iBlog', ['ngMaterial', 'ui.router', 'ngResource', 'ngSanitize', 'angular-storage'])
    .config(function ($mdThemingProvider, $mdIconProvider) {


        $mdThemingProvider.definePalette('mcgpalette0', {
            '50': 'e7eaee',
            '100': 'c2cbd4',
            '200': '9aa8b7',
            '300': '72859a',
            '400': '536a85',
            '500': '35506f',
            '600': '304967',
            '700': '28405c',
            '800': '223752',
            '900': '162740',
            'A100': '7fafff',
            'A200': '4c90ff',
            'A400': '1970ff',
            'A700': '0060fe',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200'],
            'contrastLightColors': ['400', '500', '600', '700', '800', '900', 'A400', 'A700']
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('mcgpalette0')

        $mdIconProvider
            .defaultFontSet('FontAwesome')
            .fontSet('fa', 'FontAwesome');
    });
angular.module('iBlog')
    .factory('AuthInterceptor', ['store', function (store) {
        return {
            // Send the Authorization header with each request
            'request': function (config) {
                config.headers = config.headers || {};
                var encodedString = store.get('user_secret');
                config.headers.Authorization = 'Basic ' + encodedString;
                return config;
            }
        };
}]);
