/* global angular, $ */

angular.module('codeword')
	.factory('puzzleFactory', ['$http', '$q', 'storage',
		function ($http, $q, storage) {

		function load(index) {
			var deferred = $q.defer();

			$http.get('puzzles/puzzle' + index + '.json')
				.success(function (data) {
					deferred.resolve(Puzzle(data, index));
				})
				.error(function () {
					deferred.reject();
				});

			return deferred.promise;
		}

		function Puzzle(puzzle, number) {
			var state = storage.getState(number) || puzzle.state,
			    initState = puzzle.state.slice(0),
			    solution = puzzle.solution,
			    map = puzzle.map,
			    inverseState = getInverseState(state),
			    inverseInitialState = getInverseState(initState),
			    undoStack = [],
			    redoStack = [];

			function getInverseState(forwardState) {
				return forwardState.reduce(function (obj, item, index) {
					if (item) {
							obj[item] = index + 1;
						}
						return obj;
					}, {});
			}

			function setLetter(code, letter) {
				if (inverseInitialState[letter]) {
					return;
				}

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

				storage.saveState(number, state);

				if (isSolved()) {
					storage.setGlobalState(number, 'solved');
				}
				else {
					storage.setGlobalState(number, 'inProgress');
				}
			}

			function undo() {
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

			function redo() {
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

			function isSolved() {
				return state.every(function (x, i) {
					return x == solution[i];
				});
			};

			function isValid() {
				return state.every(function (x, i) {
					return !x || x == solution[i];
				})
			}

			function match(letter) {
				return inverseState[letter];
			};

			return {
				state: state,
				map: map,
				initState: initState,
				setLetter: setLetter,
				undo: undo,
				redo: redo,
				isSolved: isSolved,
				isValid: isValid,
				match: match
			};
		}

		return { load: load };

	}]);