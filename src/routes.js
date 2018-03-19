(function() {
    Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function Config($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.state({
            name: '404',
            url: '/404',
            component: 'notfound'
        });

        $stateProvider.state({
            name: 'home',
            url: '/',
            component: 'home'
        });

        $urlRouterProvider.otherwise('404');

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    angular.module('app').config(Config);
})();