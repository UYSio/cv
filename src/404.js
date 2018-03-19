(function() {
    Controller.$inject = ['images'];
    function Controller(images) {
        console.log('404 contrl');
        var ctrl = this;
        ctrl.images = images;
    }

    angular.module('app').component('notfound', {
        templateUrl: '404.html',
        controller: Controller
    });
})();