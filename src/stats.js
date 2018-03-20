(function () {
    // http://ejohn.org/blog/partial-functions-in-javascript/
    Function.prototype.curry = function () {
        var fn = this, args = Array.prototype.slice.call(arguments);
        return function () {
            return fn.apply(this, args.concat(
                Array.prototype.slice.call(arguments)));
        };
    };

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    function calc(_, moment, data) {
        var it = _.map(data.roles, function (role) {

            var start = moment(role.start).format('YYYY-MM');
            var end;
            if ('end' in role) {
                end = moment(role.end).format('YYYY-MM');
            } else {
                // no end date means "until now"
                end = moment().format('YYYY-MM');
            }
            // var range = moment().range(start, end);
            // var diff = range.diff('months');
            
            console.log(start, end);
        });
        
    }
    angular.module('app').factory('stats', ['_', 'moment', function (_, moment) {
        return {
            calc: calc.curry(_).curry(moment)
        }
    }]);
})();