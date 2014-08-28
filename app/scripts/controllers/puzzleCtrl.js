angular.module('codeword')
	.controller('puzzleCtrl', function ($scope, $routeParams, puzzle) {

		$scope.puzzleNumber = $routeParams.id;
		$scope.map = puzzle.map;
		$scope.state = puzzle.state;
		$scope.initState = puzzle.initState;
		$scope.selected = null;

		function isLetter(charCode) {
			return ((charCode - 1) & 0x40) == 0x40 &&
				((charCode - 1) & 0x1f) < 26;
		}

		$scope.select = function (cell) {

			$scope.selected = cell;

		}

		$scope.setLetter = function (cell, option) {
			$scope.$apply(function () {
				puzzle.setLetter(cell, option);
			});
		};

	});