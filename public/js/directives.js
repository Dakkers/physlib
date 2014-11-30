"use strict";
var dirs = angular.module('physlibDirectives', []);

var UWID_REGEXP = /^[0-9]{8}$/;
dirs.directive('uwid', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.uwid = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue))
					return true;

				if (UWID_REGEXP.test(viewValue))
					return true;

				return false;
			};
		}
	};
});