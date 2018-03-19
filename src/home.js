(function() {
  Ctrl.$inject = ['$scope', '_', 'images', '$sce', '$timeout', 'portfolio'];
  function Ctrl($scope, _, images, $sce, $timeout, portfolio) {

    var ctrl = this;
    ctrl.images = images;
    ctrl.portfolio = portfolio;

    ctrl.showExperience = 5;
    ctrl.showEducation = 5;
  }

  angular.module('app').component('home', {
    templateUrl: 'home.html',
    controller: Ctrl
  });
})();