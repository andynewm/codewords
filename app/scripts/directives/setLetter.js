/* global angular, $ */

angular.module('codeword')
	.directive('setLetter', function () {

		return {
			link: function (scope, element, attrs) {
				element.on('mousedown', function () {
					if (scope.selected != null) {
						scope.setLetter(scope.selected, scope.letter);

						return false; // stop cell losing focus
					}
				});
			}
		}

	});