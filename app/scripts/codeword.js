/* global angular */

angular.module('codeword', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'views/select.html',
				controller: 'selectCtrl'
			})
			.when('/:id', {
				templateUrl: 'views/puzzle.html',
				controller: 'puzzleCtrl',
				resolve: {
					puzzle: ['puzzleFactory', '$route', function(puzzleFactory, $route) {
						return puzzleFactory.load($route.current.params.id);
					}]
				}
			})
			.otherwise({redirectTo: '/'});

	}]);