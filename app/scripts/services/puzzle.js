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

					state = undoStack.pop();
					inverseState = getInverseState(state);
				}
			}

			function redo() {
				if (redoStack.length) {
					undoStack.push(state.slice(0));

					state = redoStack.pop();
					inverseState = getInverseState(state);
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
			}

			function getState(code) {
				return state[code];
			}

			function clear() {
				undoStack.push(state.slice(0));
				redoStack.length = 0;

				state = initState.slice(0);
				inverseState = getInverseState(state);
			}

			return {
				getState: getState,
				map: map,
				initState: initState,
				setLetter: setLetter,
				undo: undo,
				redo: redo,
				isSolved: isSolved,
				isValid: isValid,
				match: match,
				clear: clear
			};
		}

		return { load: load };

	}]);