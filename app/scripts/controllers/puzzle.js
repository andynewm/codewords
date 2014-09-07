/* global angular */

angular.module('codeword')
	.controller('puzzleCtrl', ['$scope', '$timeout', '$routeParams', 'puzzle',
		function ($scope, $timeout, $routeParams, puzzle) {

		$scope.map = puzzle.map;
		$scope.state = puzzle.state;
		$scope.initState = puzzle.initState;
		$scope.selected = null;

		$scope.select = function (cell) {
			$scope.selected = cell;
		};

		$scope.deselect = function () {
			$scope.selected = null;
		}

		$scope.setLetter = function (cell, option) {
			$scope.$apply(function () {
				puzzle.setLetter(cell, option);
			});
		};

		$scope.match = function (letter) {
			return puzzle.match(letter);
		};

		$scope.isSolved = function () {
			return puzzle.isSolved();
		};

		$scope.isValid = function () {
			return puzzle.isValid();
		};

		$scope.undo = function () {
			return puzzle.undo();
		};

		$scope.redo = function () {
			return puzzle.redo();
		};

		$scope.showCheck = function () {
			$scope.checkVisible = true;
			$timeout(function () { 
				$scope.checkVisible = false;
			}, 1600);
		};

		var id = +$routeParams.id;

		$scope.next = id < 148 ? id + 1 : null;

	}]);