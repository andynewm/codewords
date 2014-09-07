/* global angular, $ */

angular.module('codeword')
	.factory('puzzleFactory', ['$http', '$q', 'storage',
		function ($http, $q, storage) {

		function load(index) {
			var deferred = $q.defer();

			$http.get('puzzles/puzzle' + index + '.json')
				.success(function (data) {
					deferred.resolve(new Puzzle(data, index));
				})
				.error(function () {
					deferred.reject();
				});

			return deferred.promise;
		}

		function Puzzle(puzzle, number) {
			this.state = storage.getState(number) || puzzle.state;
			this.number = number;
			this.initState = puzzle.state.slice(0);
			this.solution = puzzle.solution;
			this.map = puzzle.map;
			this.inverseState = this.state.reduce(function (obj, item, index) {
				if (item) {
					obj[item] = index + 1;
				}
				return obj;
			}, {});
			this.inverseInitialState = this.initState.reduce(function (obj, item, index) {
				if (item) {
					obj[item] = index + 1;
				}
				return obj;
			}, {});
			this.undoStack = [];
			this.redoStack = [];
		}

		Puzzle.prototype.setLetter = function (code, letter) {
			if (this.inverseInitialState[letter]) {
				return;
			}

			var state = this.state,
			    inverseState = this.inverseState
			    undoStack = this.undoStack
			    redoStack = this.redoStack;

			undoStack.push(state.slice(0));
			redoStack.length = 0;

			if (state[code]) {
				delete inverseState[state[code]];
			}

			state.forEach(function (value, i) {
				if (value == letter) {
					state[i] = null;
				}
			});

			state[code] = letter;

			inverseState[letter] = code + 1;

			storage.saveState(this.number, this.state);

			if (this.isSolved()) {
				storage.setGlobalState(this.number, 'solved');
			}
			else {
				storage.setGlobalState(this.number, 'inProgress');
			}
		};

		Puzzle.prototype.undo = function () {
			var state= this.state,
			    inverseState = this.inverseState,
			    undoStack = this.undoStack,
			    redoStack = this.redoStack;

			if (undoStack.length) {
				redoStack.push(state.slice(0));

				for(prop in inverseState) {
					delete inverseState[prop];
				}

				undoStack.pop().forEach(function (letter, i) {
					if (letter) {
						inverseState[letter] = i + 1;
					}
					state[i] = letter;
				});
			}
		}

		Puzzle.prototype.redo = function () {
			var state= this.state,
			    inverseState = this.inverseState,
			    undoStack = this.undoStack,
			    redoStack = this.redoStack;

			if (redoStack.length) {
				undoStack.push(state.slice(0));

				for(prop in inverseState) {
					delete inverseState[prop];
				}

				redoStack.pop().forEach(function (letter, i) {
					if (letter) {
						inverseState[letter] = i + 1;
					}
					state[i] = letter;
				});
			}
		}

		Puzzle.prototype.isSolved = function () {
			var state = this.state,
			    solution = this.solution;

			return state.every(function (x, i) {
				return x == solution[i];
			});
		};

		Puzzle.prototype.isValid = function () {
			var state = this.state,
			    solution = this.solution;

			return state.every(function (x, i) {
				return !x || x == solution[i];
			})
		}

		Puzzle.prototype.match = function (letter) {
			return this.inverseState[letter];
		};

		return { load: load };

	}]);