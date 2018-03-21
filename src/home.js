(function() {
  Ctrl.$inject = ['$scope', '_', 'images', '$sce', '$timeout', 'portfolio'];
  function Ctrl($scope, _, images, $sce, $timeout, portfolio) {

    var ctrl = this;
    ctrl.images = images;
    ctrl.portfolio = portfolio;

    ctrl.showExperience = 5;
    ctrl.showEducation = 5;

    var byTech =  _.reduce(['programming', 'framework', 'database', 'other'], function (aggr, cat) {
      var len =_.uniq(_.reduce(portfolio.roles, function (aggr, role) {
        var byCat = _.reduce(role.tech[cat], function (aggr, tech) {
          aggr.push(tech);
          return aggr;
        }, aggr);
        aggr.concat(byCat);
        return aggr;
      }, [])).length;
      aggr[cat] = len;
      return aggr;
    }, {});

    var byTechVals = _.values(byTech);

    ctrl.show = {
      experience: {
        n: 5,
        max: portfolio.roles.length
      },
      education: {
        n: 5,
        max: portfolio.education.length
      },
      programming: {
        n: 3,
        max: byTechVals[0]
      },
      framework: {
        n: 3,
        max: byTechVals[1]
      },
      database: {
        n: 3,
        max: byTechVals[2]
      },
      other: {
        n: 3,
        max: byTechVals[3]
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