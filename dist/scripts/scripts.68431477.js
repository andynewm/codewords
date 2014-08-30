angular.module("codeword",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/select.html",controller:"selectCtrl"}).when("/:id",{templateUrl:"views/puzzle.html",controller:"puzzleCtrl",resolve:{puzzle:["puzzleFactory","$route",function(a,b){return a.load(b.current.params.id)}]}}).otherwise({redirectTo:"/"})}]),angular.module("codeword").controller("puzzleCtrl",["$scope","$routeParams","puzzle",function(a,b,c){a.puzzleNumber=b.id,a.map=c.map,a.state=c.state,a.initState=c.initState,a.selected=null,a.select=function(b){a.selected=b},a.setLetter=function(b,d){a.$apply(function(){c.setLetter(b,d)})}}]),angular.module("codeword").controller("selectCtrl",["$scope",function(a){a.range=function(a){for(var b=[],c=0;a>c;c++)b.push(c);return b}}]),angular.module("codeword").factory("puzzleFactory",["$http","$routeParams","$q",function(a,b,c){function d(b){var d=c.defer();return a.get("puzzles/puzzle"+b+".json").success(function(a){d.resolve(new e(a))}).error(function(){d.reject()}),d.promise}function e(a){this.state=a.state,this.initState=a.state.slice(0),this.solution=a.solution,this.map=a.map}return e.prototype.setLetter=function(a,b){this.state.forEach(function(a,c,d){a==b&&(d[c]=null)}),this.state[a]=b},e.prototype.isSolved=function(){return state.every(function(a,b){return a==solution[b]})},{load:d}}]),angular.module("codeword").directive("testd",function(){function a(a){return 64==(a-1&64)&&26>(a-1&31)}return{link:function(b,c){c.on("keydown",function(c){switch(c.which){case 39:return $(this).closest("td").nextAll().find(".cell:not(.default)").first().focus(),!1;case 38:var d=$(this).closest("td").index()+1;return $(this).closest("tr").prevAll().find("td:nth-child("+d+") .cell:not(.default)").last().focus(),!1;case 37:return $(this).closest("td").prevAll().find(".cell:not(.default)").last().focus(),!1;case 40:var d=$(this).closest("td").index()+1;return $(this).closest("tr").nextAll().find("td:nth-child("+d+") .cell:not(.default)").first().focus(),!1}if(a(c.which)){var e=String.fromCharCode(c.which).toUpperCase();b.setLetter(b.cell,e)}})}}});