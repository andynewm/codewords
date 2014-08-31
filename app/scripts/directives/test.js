/* global angular, $ */

angular.module('codeword')
	.directive('testd', function () {

		function isLetter(charCode) {
			return ((charCode - 1) & 0x40) == 0x40 &&
				((charCode - 1) & 0x1f) < 26;
		}

		return {
			link: function (scope, element) {
				element.on('click', function () {
					$(this).focus();
				});

				element.on('keydown', function (e) {
					var index;

					switch(e.which) {
						case 39:
							$(this)
								.closest('td')
								.nextAll()
								.find('.cell:not(.default)')
								.first()
								.click();

							return false;

						case 38:
							index = $(this)
								.closest('td')
								.index() + 1;

							$(this)
								.closest('tr')
								.prevAll()
								.find('td:nth-child(' + index + ') .cell:not(.default)')
								.last()
								.click();

							return false;

						case 37:
							$(this)
								.closest('td')
								.prevAll()
								.find('.cell:not(.default)')
								.last()
								.click();

							return false;

						case 40:
							index = $(this)
								.closest('td')
								.index() + 1;

							$(this)
								.closest('tr')
								.nextAll()
								.find('td:nth-child(' + index + ') .cell:not(.default)')
								.first()
								.click();

							return false;

						case 8:
							scope.setLetter(scope.cell, null);

							return false;
						}

					if (isLetter(e.which)) {
						var option = String.fromCharCode(e.which).toUpperCase();

						scope.setLetter(scope.cell, option);
					}
				});
			}
		};

	});