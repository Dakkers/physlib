// navbar
angular.module('physlibApp').controller('NavCtrl',
    function ($scope, $auth) {
        $scope.isAuthenticated = $auth.isAuthenticated;
    }
);

// root
angular.module('physlibApp').controller('MainCtrl', 
    function ($scope) {
    
    }
);

// login page
angular.module('physlibApp').controller('LoginCtrl',
    function ($scope, $auth) {
        $scope.login = function login() {
            $auth.login({email: $scope.email, password: $scope.password})
                .then(function(data) {
                    console.log(data);
                });
        };
    }
);

// signup page
angular.module('physlibApp').controller('SignupCtrl',
    function ($scope, $auth) {

        // clicking signup button
        $scope.signup = function signup() {
            $auth.signup({name: $scope.name, uwid: $scope.uwid, email: $scope.email, password: $scope.password})
                .then(function(data) {
                    console.log(data);
                });
        };
    }
);
