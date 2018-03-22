(function () {

    
    function render(num, attrs, element, d3, svg, _data, $timeout, renderTimeout, moment) {
        if (!_data) return;
        if (renderTimeout) clearTimeout(renderTimeout);

        function years(d) {
            var dur = moment.duration(d.score, "months");
            var years = dur.years();
            var months = dur.months();
            if (years == 0) {
                return '< 1';
            } else {
                var ret = '' + years + 'y';
                if (months > 0) {
                    ret += ' ' + months + 'm';
                }
                return ret;
            }
        }

        renderTimeout = $timeout(function() {
            var data = _data.slice(0, num);
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            var OFFSET = 150;
            var margin = parseInt(attrs.margin) || 20,
                barHeight = parseInt(attrs.barHeight) || 22,
                barPadding = parseInt(attrs.barPadding) || 5;
            // setup variables
            var width = d3.select(element[0]).node().offsetWidth - margin,
                // calculate the height
                height = data.length * (barHeight + barPadding),
                // color = d3.scaleOrdinal(d3.schemeCategory20b),
                // color = d3.scaleOrdinal(d3.schemeDark2),
                // color = function () { return '#f4b268'; },
                color = function () { return '#75aafd'; },
                // our xScale
                xScale = d3.scaleLinear()
                    .domain([0, d3.max(data, function (d) {
                        return d.score;
                    })])
                    .range([0, width-OFFSET]);

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll('rect')
                .data(data).enter()
                .append('rect')
                .attr('height', barHeight)
                .attr('x', Math.round(margin / 2) + OFFSET)
                .attr('y', function (d, i) {
                    return i * (barHeight + barPadding);
                })
                .attr('fill', function (d) { return color(d.score); })
                .transition()
                .duration(1000)
                .attr('width', function (d) {
                    return xScale(d.score);
                });

            var texts = svg.selectAll('text')
                .data(data)
                .enter();

            texts
                .append('text')
                .attr('fill', '#222')
                .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 15;
                })
                .attr('x', 15)
                .text(function (d) { return d.name });

            texts
                .append('text')
                .attr('fill', function (d) {
                    if (d.score > 24) {
                        return '#fff';
                    } else {
                        return '#000';
                    }
                })
                .attr('text-anchor', 'start')
                .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 17;
                })
                .transition()
                .duration(1000)
                .attr('x', function (d,i) {
                    if (d.score > 24) {
                        return xScale(d.score) + OFFSET - 50;
                    } else {
                        return xScale(d.score) + OFFSET + 20;
                    }
                    
                })
                .text(years);

            }, 200);
    }

    angular.module('app').directive('viz', ['d3', 'portfolio', 'stats', '$timeout', 'moment',  function (d3, portfolio, stats, $timeout, moment) {
        return {
            scope: {
                show: '=',
                category: '@'
            },
            templateUrl: 'viz.html',
            link: function (scope, element, attrs) {
                var renderTimeout;

                var svg = d3.select(element[0])
                    .append("svg")
                    .style('width', '100%');

                window.onresize = function () { scope.$apply(); };

                var data = stats.calc(portfolio, scope.category);

                scope.$watch(function () {
                    return angular.element(window)[0].innerWidth;
                }, function () {
                    scope.render(scope.show, attrs, element, d3, svg, data, $timeout, renderTimeout, moment);
                });

                scope.$watch('show', function(n, o) {
                    scope.render(scope.show, attrs, element, d3, svg, data, $timeout, renderTimeout, moment);
                });
                scope.render = render;
            }
        };
    }]);
})();