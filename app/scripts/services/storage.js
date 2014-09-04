angular.module('codeword')
	.factory('storage', function () {

		function saveState(puzzle, state) {
			localStorage[getKey(puzzle)] =
				JSON.stringify(state);
		}

		function getState(puzzle) {
			var string = localStorage[getKey(puzzle)]
			return string && JSON.parse(string);
		}

		function getKey(puzzle) {
			return '_pz_' + puzzle;
		}

		return {
			getState: getState,
			saveState: saveState
		};

	});