import './css/main.scss';

// data
import portfolio from './portfolio.json';

require('angular');
require('@uirouter/angularjs');
require('angular-animate');
require('ng-async-img');
require('angular-moment');

import Moment from 'moment';
import { extendMoment } from 'moment-range'; 
const moment = extendMoment(Moment);

import _ from 'lodash';

var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngAsyncImg']);
app.constant('portfolio', portfolio);
app.constant('_', _);
app.constant('moment', moment);
app.constant('d3', require('d3'));
app.constant('images', {
    profilePicImgURL: require('./images/juan.jpg'),
    $404: require('./images/404.jpg'),
    icons: {
        avatar: require("./images/icons/glyphicons-4-user.png"),
        experience: require("./images/icons/glyphicons-342-briefcase.png"),
        skills: require("./images/icons/glyphicons-731-puzzle.png"),
        software: require("./images/icons/glyphicons-691-laptop.png"),
        education: require("./images/icons/glyphicons-501-education.png"),
        certifications: require("./images/icons/glyphicons-333-certificate.png"),
        interests: require("./images/icons/glyphicons-20-heart-empty.png")
    }
});

app.filter('abs', function() {
    return function(num) { return Math.abs(num); }
});

require('./src/routes.js');
require('./src/home.js');
require('./src/404.js');
require('./src/viz.js');
require('./src/stats.js');