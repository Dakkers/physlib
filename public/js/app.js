"use strict";

angular.module('physlibApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'satellizer',
    'physlibServices',
    'physlibDirectives'
]).config(function ($routeProvider, $authProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            activeTab: 'home'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            activeTab: 'login'
        })
        .when('/logout', {
            templateUrl: null,
            controller: 'LogoutCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            activeTab: 'signup'
        })
        .when('/me', {
            templateUrl: 'views/user.html',
            controller: 'UserCtrl'
        })
        .when('/books', {
            templateUrl: 'views/books.html',
            controller: 'BooksCtrl',
            activeTab: 'books'
        })
        .otherwise({
            redirectTo: '/'
        });

    $authProvider.loginRedirect = '/me';
});
