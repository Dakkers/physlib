"use strict";

// navbar
angular.module('physlibApp').controller('NavCtrl', function ($scope, $auth, $route) {
    $scope.$route = $route;
    $scope.isAuthenticated = $auth.isAuthenticated;
});

// login page
angular.module('physlibApp').controller('LoginCtrl', function ($scope, $auth) {
    $scope.login = function login() {
        $auth.login({email: $scope.email, password: $scope.password})
            .then(function(data) {
                console.log(data);
            });
    };
});

// logging out
angular.module('physlibApp').controller('LogoutCtrl', function ($scope, $auth) {
    if (!$auth.isAuthenticated)
        return;

    $auth.logout();
});

// signup page
angular.module('physlibApp').controller('SignupCtrl', function ($scope, $auth) {
    // clicking signup button
    $scope.signup = function signup() {
        $auth.signup({
                name: $scope.name, 
                uwid: $scope.uwid, 
                email: $scope.email, 
                password: $scope.password
            }).then(function(data) {
                console.log(data);
            });
    };
});

// books page
angular.module('physlibApp').controller('BooksCtrl', function ($scope, socket) {
    $scope.physicsCategories = ['Astrophysics', 'Electricty & Magnetism', 'Optics', 'Quantum'];

    $scope.allBooks = {
        'Astrophysics': {
            '1234': { name: 'STARS LOL', signedOut: false, author: "confucius"},
            '2144': { name: 'GALAXIES KEWL', signedOut: false, author: "confucius"}
        },

        'Electricty & Magnetism': {
            '3441': { name: 'E&M LOLWUT', signedOut: true, author: "confucius"}
        }
    };

    $scope.attemptSignout = function(cat, ISBN) {
        socket.emit('signout-attempt', {category: cat, ISBN: ISBN});
    };

    $scope.attemptRequest = function(cat, ISBN) {
        socket.emit('request-attempt', {category: cat, ISBN: ISBN});
    };

    // SOCKET EVENTS ===========================================

    // a book has become available
    socket.on('book-available', function(data) {
        console.log(data);
    });

    // a book has been signed out by someone else
    socket.on('book-signedout', function(data) {
        console.log(data);
    });

    // user attempted to sign out a book
    socket.on('signout-success', function(data) {
        var category = data.category,
            ISBN = data.ISBN;
        $scope.allBooks[category][ISBN].signedOut = true;
    });

    socket.on('request-success', function(data) {

    });

    socket.on('signout-failure', function(data) {
        // make thing appear...
    });

    socket.on('request-failure', function(data) {
        // make thing appear...
    });
});