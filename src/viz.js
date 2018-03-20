(function() {
    function render(d3, svg, data) {
        console.log('rendering...');
    }

    angular.module('app').directive('viz', ['d3', 'portfolio', function (d3, portfolio) {
        return {
            scope: {
            },
            templateUrl: 'viz.html',
            link: function(scope, element, attrs) {
                var svg = d3.select(element[0])
                    .append("svg")
                    .style('width', '100%');

                window.onresize = function() { scope.$apply(); };

                scope.$watch(function() {
                    return angular.element(window)[0].innerWidth;
                }, function() {
                    scope.render(d3, svg, portfolio);
                });

                scope.render = render;
            }
        };
    }]);
})();

var _data = [
    {name: "a", score: 25},
    {name: "b", score: 30},
    {name: "c", score: 15},
    {name: "d", score: 10}
  ];