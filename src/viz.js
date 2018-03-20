(function () {
    function render(attrs, element, d3, svg, data) {
        // remove all previous items before render
        svg.selectAll('*').remove();

        // If we don't pass any data, return out of the element
        if (!data) return;

        var margin = parseInt(attrs.margin) || 2,
              barHeight = parseInt(attrs.barHeight) || 2,
              barPadding = parseInt(attrs.barPadding) || 1;
        // setup variables
        var width = d3.select(element[0]).node().offsetWidth - margin,
            // calculate the height
            height = data.length * (barHeight + barPadding),
            // Use the category20() scale function for multicolor support
            color = d3.scaleOrdinal(d3.schemeCategory20),
            // our xScale
            xScale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) {
                    return d.score;
                })])
                .range([0, width]);

        // set the height based on the calculations above
        svg.attr('height', height);

        //create the rectangles for the bar chart
        svg.selectAll('rect')
            .data(data).enter()
            .append('rect')
            .attr('height', barHeight)
            .attr('width', 140)
            .attr('x', Math.round(margin / 2))
            .attr('y', function (d, i) {
                return i * (barHeight + barPadding);
            })
            .attr('fill', function (d) { return color(d.score); })
            .transition()
            .duration(1000)
            .attr('width', function (d) {
                return xScale(d.score);
            });
    }

    angular.module('app').directive('viz', ['d3', 'portfolio', 'stats', function (d3, portfolio, stats) {
        return {
            scope: {
            },
            templateUrl: 'viz.html',
            link: function (scope, element, attrs) {
                var svg = d3.select(element[0])
                    .append("svg")
                    .style('width', '100%');

                window.onresize = function () { scope.$apply(); };

                scope.$watch(function () {
                    return angular.element(window)[0].innerWidth;
                }, function () {
                    scope.render(attrs, element, d3, svg, stats.calc(portfolio));
                });

                scope.render = render;
            }
        };
    }]);
})();