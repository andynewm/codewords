angular.module("codeword",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/select.html",controller:"selectCtrl"}).when("/:id",{templateUrl:"views/puzzle.html",controller:"puzzleCtrl",resolve:{puzzle:["puzzleFactory","$route",function(a,b){return a.load(b.current.params.id)}]}}).otherwise({redirectTo:"/"})}]),angular.module("codeword").controller("puzzleCtrl",["$scope","$timeout","$routeParams","puzzle",function(a,b,c,d){a.map=d.map,a.state=d.state,a.initState=d.initState,a.selected=null,a.select=function(b){a.selected=b},a.deselect=function(){a.selected=null},a.setLetter=function(b,c){a.$apply(function(){d.setLetter(b,c)})},a.match=function(a){return d.match(a)},a.isSolved=function(){return d.isSolved()},a.isValid=function(){return d.isValid()},a.showCheck=function(){a.checkVisible=!0,b(function(){a.checkVisible=!1},1600)};var e=+c.id;a.next=148>e?e+1:null}]),angular.module("codeword").controller("selectCtrl",["$scope","storage",function(a,b){a.states=b.getGlobalState(),a.range=function(a){for(var b=[],c=0;a>c;c++)b.push(c);return b}}]),angular.module("codeword").factory("puzzleFactory",["$http","$q","storage",function(a,b,c){function d(c){var d=b.defer();return a.get("puzzles/puzzle"+c+".json").success(function(a){d.resolve(new e(a,c))}).error(function(){d.reject()}),d.promise}function e(a,b){this.state=c.getState(b)||a.state,this.number=b,this.initState=a.state.slice(0),this.solution=a.solution,this.map=a.map,this.inverseState=this.state.reduce(function(a,b,c){return b&&(a[b]=c+1),a},{}),this.inverseInitialState=this.initState.reduce(function(a,b,c){return b&&(a[b]=c+1),a},{})}return e.prototype.setLetter=function(a,b){if(!this.inverseInitialState[b]){var d=this.state,e=this.inverseState;d[a]&&delete e[d[a]],d.forEach(function(a,c){a==b&&(d[c]=null)}),d[a]=b,e[b]=a+1,c.saveState(this.number,this.state),this.isSolved()?c.setGlobalState(this.number,"solved"):c.setGlobalState(this.number,"inProgress")}},e.prototype.isSolved=function(){var a=this.state,b=this.solution;return a.every(function(a,c){return a==b[c]})},e.prototype.isValid=function(){var a=this.state,b=this.solution;return a.every(function(a,c){return!a||a==b[c]})},e.prototype.match=function(a){return this.inverseState[a]},{load:d}}]),angular.module("codeword").factory("storage",function(){function a(a,b){localStorage[c(a)]=JSON.stringify(b)}function b(a){var b=localStorage[c(a)];return b&&JSON.parse(b)}function c(a){return g+a}function d(a,b){var c=e();c[a-1]=b,localStorage[h]=JSON.stringify(c)}function e(){var a=localStorage[h];return a&&JSON.parse(a)||f()}function f(){for(var a=[],b=0;148>b;b++)a.push("new");return a}var g="__pz__",h="__px__global";return{getState:b,saveState:a,getGlobalState:e,setGlobalState:d}}),angular.module("codeword").directive("testd",function(){function a(a){return 64==(a-1&64)&&26>(a-1&31)}return{link:function(b,c){c.on("click",function(){$(this).focus()}),c.on("keydown",function(c){var d;switch(c.which){case 39:return $(this).closest("td").nextAll().find(".cell:not(.default)").first().click(),!1;case 38:return d=$(this).closest("td").index()+1,$(this).closest("tr").prevAll().find("td:nth-child("+d+") .cell:not(.default)").last().click(),!1;case 37:return $(this).closest("td").prevAll().find(".cell:not(.default)").last().click(),!1;case 40:return d=$(this).closest("td").index()+1,$(this).closest("tr").nextAll().find("td:nth-child("+d+") .cell:not(.default)").first().click(),!1;case 8:return b.setLetter(b.cell,null),!1}if(a(c.which)){var e=String.fromCharCode(c.which).toUpperCase();b.setLetter(b.cell,e)}})}}}),angular.module("codeword").directive("setLetter",function(){return{link:function(a,b){b.on("mousedown",function(){return null!=a.selected?(a.setLetter(a.selected,a.letter),!1):void 0})}}}),angular.module("codeword").filter("pad",function(){return function(a,b){return(new Array(b).join("0")+a).substr(-b)}});