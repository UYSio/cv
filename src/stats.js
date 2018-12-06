(function () {

    // http://ejohn.org/blog/partial-functions-in-javascript/
    Function.prototype.curry = function () {
        var fn = this, args = Array.prototype.slice.call(arguments);
        return function () {
            return fn.apply(this, args.concat(
                Array.prototype.slice.call(arguments)));
        };
    };

    function calc(_, moment, data, category) {

        var ranges = _.reduce(data.roles, function (aggr, role) {

            // role start date
            var start = moment(role.start).startOf('month').format('YYYY-MM-DD');

            // role end date
            var end;
            if ('end' in role) {
                end = moment(role.end).endOf('month').format('YYYY-MM-DD');
            } else {
                // no end date means "until now"
                end = moment().format('YYYY-MM-DD');
            }
            var range = moment().range(start, end);

            return _.reduce(role.tech[category], function (_aggr, tech) {
                if (!_aggr[tech]) {
                    _aggr[tech] = [range];
                } else {
                    _aggr[tech].push(range);
                }
                return _aggr;
            }, aggr);

        }, {});

        // order ranges by start date
        var scoreD3 = _.transform(ranges, function (result, ranges, key) {

            var sum = 0;

            if (ranges.length == 1) {
                var sum = ranges[0].diff('months');
            } else {

                // sort ranges by start date
                var sortedRanges = _.sortBy(ranges, function (range) {
                    return range.start.unix();
                });

                var combinedRanges = _.reduce(sortedRanges, function (a, r) {
                    if (a.length == 0) {
                        return [r];
                    } else {
                        var last = a[a.length - 1];
                        if (last.overlaps(r, { adjacent: true })) {
                            var combo = last.add(r, { adjacent: true });
                            // replace the last range with the combo
                            a.splice(a.length-1,1, combo);
                            return a;
                        } else {
                            // no overlap, so just append
                            a.push(r);
                            return a;
                        }
                    }
                }, []);

                // if (key == 'scala') {
                //     console.log(key, sortedRanges);
                //     console.log(key, combinedRanges);
                // }

                var sum = _.reduce(combinedRanges, function (a, r) {
                    var months = r.diff('months');
                    return a + months;
                }, 0);
            }

            // scala is an anomaly - my tenure at NAP was quite long,
            // yet I only picked up Scala 2 years into that job.
            // so, subtract 2 years.
            if (key == 'scala') {
                sum -= 24;
            }
            // same goes for Keras @ pdfcrunch
            if (key == 'keras') {
                sum -= 36;
            }

            result.push({
                name: key,
                score: sum
            });
        }, []);

        // order by score
        var scores = _.orderBy(scoreD3, function (it) {
            return -it.score;
        });

        return scores;
    }
    angular.module('app').factory('stats', ['_', 'moment', function (_, moment) {
        return {
            calc: calc.curry(_).curry(moment)
        }
    }]);
})();