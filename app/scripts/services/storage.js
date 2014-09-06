angular.module('codeword')
	.factory('storage', function () {

		var puzzlePrefix = '__pz__';
		var globalKey = '__px__global';

		function saveState(puzzle, state) {
			localStorage[getKey(puzzle)] =
				JSON.stringify(state);
		}

		function getState(puzzle) {
			var string = localStorage[getKey(puzzle)]
			return string && JSON.parse(string);
		}

		function getKey(puzzle) {
			return puzzlePrefix + puzzle;
		}

		function setGlobalState(puzzle, state) {
			var states = getGlobalState();
			states[puzzle - 1] = state;
			localStorage[globalKey] = JSON.stringify(states);
		}

		function getGlobalState() {
			var string = localStorage[globalKey];
			return (string && JSON.parse(string)) || getBlankGlobalState();
		}

		function getBlankGlobalState() {
			var state = [];
			for (var i = 0; i < 148; i++) {
				state.push('new');
			}
			return state;
		}

		return {
			getState: getState,
			saveState: saveState,
			getGlobalState: getGlobalState,
			setGlobalState: setGlobalState
		};

	});