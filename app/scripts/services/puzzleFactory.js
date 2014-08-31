/* global angular */

angular.module('codeword')
	.factory('puzzleFactory', ['$http', '$q', function ($http, $q) {

		function load(index) {
			var deferred = $q.defer();

			$http.get('puzzles/puzzle' + index + '.json')
				.success(function (data) {
					deferred.resolve(new Puzzle(data));
				})
				.error(function () {
					deferred.reject();
				});

			return deferred.promise;
		}

		function Puzzle(puzzle) {
			this.state = puzzle.state;
			this.initState = puzzle.state.slice(0);
			this.solution = puzzle.solution;
			this.map = puzzle.map;
			this.inverseState = puzzle.state.reduce(function (obj, item, index) {
				if (item) {
					obj[item] = index + 1;
				}
				return obj;
			}, {});
		}

		Puzzle.prototype.setLetter = function (code, letter) {
			var state = this.state,
			    inverseState = this.inverseState;

			state.forEach(function (value, i) {
				if (value == letter) {

					state[i] = null;
				}

			});
			
			state[code] = letter;

			inverseState[letter] = code + 1;
		};

		Puzzle.prototype.isSolved = function () {
			var state = this.state,
			    solution = this.solution;

			return state.every(function (x, i) {
				return x == solution[i];
			});
		};

		Puzzle.prototype.match = function (letter) {
			return this.inverseState[letter];
		};

		return { load: load };

	}]);