(function() {
  Ctrl.$inject = ['$scope', '_', 'images', '$sce', '$timeout', 'portfolio'];
  function Ctrl($scope, _, images, $sce, $timeout, portfolio) {

    var ctrl = this;
    ctrl.images = images;
    ctrl.portfolio = portfolio;

    ctrl.showExperience = 5;
    ctrl.showEducation = 5;

    var maxTech = _.uniq(_.reduce(portfolio.roles, function (aggr, role) {
      return _.reduce(role.tech, function (aggr, tech) {
        aggr.push(tech);
        return aggr;
      }, aggr)
    }, [])).length;

    ctrl.show = {
      experience: {
        n: 5,
        max: portfolio.roles.length
      },
      education: {
        n: 5,
        max: portfolio.education.length
      },
      tech: {
        n: 3,
        max: maxTech
      }
    };

    ctrl.showMore = function(what, n) {
      // console.log('adding', n, 'to', what);
      var total = ctrl.show[what].n + n;
      // console.log('what', ctrl.show[what].n, 'total', total);
      // console.log('min of', ctrl.show[what].max, total);
      total = Math.min(ctrl.show[what].max, total);
      // console.log('total now', total);
      ctrl.show[what].n = total;
    };
  }

  angular.module('app').component('home', {
    templateUrl: 'home.html',
    controller: Ctrl
  });
})();