'use strict';

describe('Controller: puzzleCtrl', function () {

	// load the controller's module
	beforeEach(module('codeword'));

	var puzzleCtrl,
	    scope;

	var puzzle = {
		map: [1, 2, 3],
		state: "ABC",
		initState: "ABCD"
	};

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		puzzleCtrl = $controller('puzzleCtrl', {
			$scope: scope,
			puzzle: puzzle
		});
	}));

	it('should copy values from puzzle into scope', function () {
		expect(scope.state).toBe(puzzle.state);
		expect(scope.map).toBe(puzzle.map);
		expect(scope.initState).toBe(puzzle.initState);
	});

	it('should not have anything selected by default', function () {
		expect(scope.selected).toBe(null);
	});
});
