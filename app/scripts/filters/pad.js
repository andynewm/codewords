/* global angular */

angular.module('codeword')
	.filter('pad', function () {

		return function (input, length) {
			return (new Array(length).join('0') + input).substr(-length);
		};

	});