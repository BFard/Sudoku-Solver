var board = [];
var getBoard = function() {
    board = [];
    for (i = 0; i < 81; i++) {
        var cell = $("input").eq(i).val();
        var accepted = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (accepted.indexOf(cell) === -1) {
            return false;
        }
        else if (cell === "") {
            board.push(0);
        }
        else {
            board.push(parseInt(cell));
        }
    }
}
var validate = function() {
    if (board.length != 81) {
        return false;
    }
    for (i = 0; i < 9; i++) {
        var rows = [];
        var first = i * 9;
        for (j = 1; j < 10; j++) {
            var temp = [];
            temp.push(board.slice(first + (j - 1), first + j));
            rows.push(temp[0][0]);
        }
        if (rows.length === 9) {
            var checked = [];
            for (g = 0; g < 9; g++) {
                var check = rows[g];
                checked.push(check);
                if (check != 0 && checked.indexOf(check) != checked.lastIndexOf(check)) {
                    return false;
                }
            }
        }
    }
    for (i = 0; i < 9; i++) {
        var column = [];
        var checked = [];
        for (j = 0; j < 9; j++) {
            var first = j * 9;
            var temp = [];
            temp.push(board.slice(first + i, first + i + 1));
            column.push(temp[0][0]);
        }
        for (g = 0; g < 9; g++) {
            var check = column[g];
            checked.push(check);
            if (check != 0 && checked.indexOf(check) != checked.lastIndexOf(check)) {
                return false;
            }
        }
    }
    for (i = 0; i < 9; i++) {
        var three = [];
        switch (i) {
            case 0:
                for (g = 0; g < 3; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first, first + 3));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 1:
                for (g = 0; g < 3; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first + 3, first + 6));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 2:
                for (g = 0; g < 3; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first + 6, first + 9));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 3:
                for (g = 3; g < 6; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first, first + 3));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 4:
                for (g = 3; g < 6; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first + 3, first + 6));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 5:
                for (g = 3; g < 6; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first + 6, first + 9));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 6:
                for (g = 6; g < 9; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first, first + 3));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 7:
                for (g = 6; g < 9; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first + 3, first + 6));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
            case 8:
                for (g = 6; g < 9; g++) {
                    var first = g * 9;
                    var temp = [];
                    temp.push(board.slice(first + 6, first + 9));
                    three.push(temp[0][0]);
                    three.push(temp[0][1]);
                    three.push(temp[0][2]);
                }
                break;
        }
        var checked = [];
        for (j = 0; j < 9; j++) {
            var check = three[j];
            checked.push(check);
            if (check != 0 && checked.indexOf(check) != checked.lastIndexOf(check)) {
                return false;
            }
        }
    }
    return true;
};
var solve = function() {
    if (validate() === true) {
        var empty = [];
        for(pos = 0; pos < 81; pos++) {
            if (board[pos] === 0) {
                empty.push(pos);
            }
        }
        for (cell = 0; cell < empty.length;) {
            var current = empty[cell];
            var value = board[current] + 1;
            var found = false;
            board[current] = value;
            while (found != true && value < 10)  {
                if (validate() === true) {
                    found = true;
                    cell++;
                }
                else {
                    value++;
                    board[current] = value;
                }
            }
            if (found != true) {
                board[current] = 0;
                cell--;
            }
        }
        for (i = 0; i < 81; i++) {
            var fill = $("input").eq(i);
            fill.val(board[i]);
        }
    }
    else {
        return false;
    }
}
var load = function() {
    $.ajax({
        url:"http://sudokusolver.weebly.com/files/theme/puzzles2.txt",
        success:function(result) {
            var puzzleN = (Math.floor(Math.random()*10))*81;
            var puzzle = result.slice(puzzleN, puzzleN + 81);
            var replace = puzzle.replace(/\./g, "0");
            for (i = 0; i < 81; i++) {
                var value = replace.slice(i, i + 1);
                if (value === "0") {
                    value = "";
                }
                $("input").eq(i).val(value);
            }
        }
    });
};
var main = function() {
    $(".button").mouseenter(function() {
        $(this).css("background-color", "#39D1B4");
        $(this).css("color", "white");
    });
    $(".button").mouseleave(function() {
        $(this).css("background-color", "white");
        $(this).css("color", "#204056");
    });
    $("#clear").click(function() {
        $("input").val("");
    });
    $("#load").click(load);
    $("#validate").click(function() {
        getBoard();
        if (validate() === true) {
            $("#board").css("border", "10px solid #006400");
        }
        else {
            $("#board").css("border", "10px solid #990000");
        }
        setTimeout(function() {
            $("#board").css("border", "10px solid #666");
        }, 1500);
    });
    $("#solve").click(function() {
        getBoard();
        if (solve() === false) {
            $("#board").css("border", "10px solid #990000");
        }
        else {
            $("#board").css("border", "10px solid #123456");
        }
        setTimeout(function() {
            $("#board").css("border", "10px solid #666");
        }, 1500);
    });
};
$(document).ready(main);