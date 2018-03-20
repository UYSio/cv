(function () {
    
    // http://ejohn.org/blog/partial-functions-in-javascript/
    Function.prototype.curry = function () {
        var fn = this, args = Array.prototype.slice.call(arguments);
        return function () {
            return fn.apply(this, args.concat(
                Array.prototype.slice.call(arguments)));
        };
    };

    function calc(_, moment, data) {

        var score = _.reduce(data.roles, function (aggr, role) {

            var start = moment(role.start).format('YYYY-MM');
            var end;
            if ('end' in role) {
                end = moment(role.end).format('YYYY-MM');
            } else {
                // no end date means "until now"
                end = moment().format('YYYY-MM');
            }
            var range = moment().range(start, end);
            // add 1, because 1st of 'start' and 28-31st of 'end' is presumed
            var months = range.diff('months') + 1;
            
            return _.reduce(role.tech, function (_aggr, tech) {
                if (!_aggr[tech]) {
                    _aggr[tech] = months;
                } else {
                    _aggr[tech] += months;
                }
                return _aggr;
            }, aggr);

        }, {});

        var scoreT = _.transform(score, function (result, value, key) {
            result.push({
                name: key,
                score: value
            });
        }, []);

        // console.log(scoreT);

        return scoreT;
    }
    angular.module('app').factory('stats', ['_', 'moment', function (_, moment) {
        return {
            calc: calc.curry(_).curry(moment)
        }
    }]);
})();