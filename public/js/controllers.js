"use strict";

// navbar
angular.module('physlibApp').controller('NavCtrl',function ($scope, $auth, $route) {
    $scope.$route = $route;
    $scope.isAuthenticated = $auth.isAuthenticated;
});

// login page
angular.module('physlibApp').controller('LoginCtrl',function ($scope, $auth) {
    $scope.login = function login() {
        $auth.login({email: $scope.email, password: $scope.password})
            .then(function(data) {
                console.log(data);
            });
    };
});

// signup page
angular.module('physlibApp').controller('SignupCtrl',function ($scope, $auth) {
    // clicking signup button
    $scope.signup = function signup() {
        $auth.signup({name: $scope.name, uwid: $scope.uwid, email: $scope.email, password: $scope.password})
            .then(function(data) {
                console.log(data);
            });
    };
});

// books page
angular.module('physlibApp').controller('BooksCtrl', function ($scope, socket) {
    $scope.physicsCategories = ['Astrophysics', 'Electricty & Magnetism', 'Optics', 'Quantum'];

    $scope.allBooks = {
        'Astrophysics': {
            '1234': {
                name: 'STARS LOL',
                signedOut: false
            },
            '2144': {
                name: 'GALAXIES KEWL',
                signedOut: false
            }
        },

        'Electricty & Magnetism': {
            '3441': {
                name: 'E&M LOLWUT',
                signedOut: false
            }
        }
    };

    $scope.CHANGEPLACES = function() {
        $scope.allBooks.Astrophysics['1234'].signedOut = !$scope.allBooks.Astrophysics['1234'].signedOut;
        socket.emit('update-book', {category: 'Astrophysics', ISBN: '1234'});
    };

    socket.on('update-book', function(data) {
        console.log(data);
        console.log($scope.allBooks[data.category][data.ISBN]);
        $scope.allBooks[data.category][data.ISBN].signedOut = !$scope.allBooks[data.category][data.ISBN].signedOut;
    });
});