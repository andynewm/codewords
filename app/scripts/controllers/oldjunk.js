
/*

sc.map = [[]];
sc.state = [];
sc.selected = null;
solution = null;

sc.undoStack = [];
sc.redoStack = [];

sc.select = function (cell) {
   sc.selected = cell;
};

sc.deselect = function () {
   sc.selected = null;
};

sc.undo = function () {

    if ($scope.undoStack.length) {

       sc.redoStack.push($scope.state)

       sc.state =sc.undoStack.pop().slice(0);

    }

};

sc.redo = function () {

    if ($scope.redoStack.length) {

       sc.undoStack.push($scope.state)

       sc.state =sc.redoStack.pop().slice(0);

    }

};

sc.match = function (letter) {

    return ($scope.state.indexOf(letter) + 1) || null;

};

sc.enter = function (event, cell) {
    if (event.which == 8) {
       sc.state[cell] = null;
        event.preventDefault();
    }

    else if (isLetter(event.which)) {
        var option = String.fromCharCode(event.which).toUpperCase();

       sc.undoStack.push($scope.state);

       sc.redoStack = [];

       sc.state =sc.state.slice(0);

       sc.state
            .forEach(function (x, i) { if (x == option)sc.state[i] = null; });

       sc.state[cell] = option;

    }

    if (isSolved()) {
        console.log('done');
    }
};

function isSolved() {
    returnsc.state.every(function (x, i) {
        return x == solution[i];
    });
}

function noWrong() {
    returnsc.state.filter(function (x, i) {
        return x != null && x != solution[i];
    }).length;
}

sc.check = function () {
    console.log(noWrong());
};

var getFriends = function (x, y) {

    var dx;
    var r = [];
    for (dx = x; dx >= 0; dx--) {
        if ($scope.map[y][dx]) {
            r.unshift($scope.map[dx][y])
        }
        else {
            break;
        }
    }

    for (dx = x+1; dx < 13; dx++) {
        if ($scope.map[y][dx]) {
            r.push($scope.map[dx][y])
        }
        else {
            break;
        }
    }

    return r;

};

sc.$on('$locationChangeSuccess', function () {

    console.log($location.hash());

});

sc.range = function (n) {

    var r = [];

    for (var i = 0; i < n; i++) {
        r.push(i);
    }

    return r;

};

function isLetter(charCode) {
    return ((charCode - 1) & 0x40) == 0x40 &&
        ((charCode - 1) & 0x1f) < 26;
}

function loadPuzzle(index) {
    $http.get('content/puzzles/puzzle' + index + '.json').then(function (response) {

       sc.map = response.data.map;
       sc.initialState = response.data.state.slice(0);
       sc.state = response.data.state;
        solution = response.data.solution;

    });
}

loadPuzzle(window.location.hash.substr(1) || 1);        

});