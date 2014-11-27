"use strict";

angular.module('physlibApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'satellizer',
    'physlibServices'
]).config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            activeTab: 'home'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            activeTab: 'login'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            activeTab: 'signup'
        })
        .when('/books', {
            templateUrl: 'views/books.html',
            controller: 'BooksCtrl',
            activeTab: 'books'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
