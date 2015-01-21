var validate = function() {
    for(i = 0; i < 81; i++) {
        var cell = $("input").eq(i).val();
        var accepted = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (accepted.indexOf(cell) === -1) {
            return false;
        }
    }
    for (i = 1; i < 10; i++) {
        var row = "#" + i.toString();
        var rows = [];
        for (j = 0; j < 9; j++) {
            rows.push($(row).find("input").eq(j).val());
            if (rows.length === 9) {
                var checked = [];
                for (g = 0; g < 9; g++) {
                    var check = rows[g];
                    checked.push(check);
                    if (check != "" && checked.indexOf(check) != checked.lastIndexOf(check)) {
                        return false;
                    }
                }
            }
        }
    }
    for (i = 0; i < 9; i++) {
        var column = [];
        var checked = [];
        for (j = 1; j < 10; j++) {
            var row = "#" + j.toString();
            column.push($(row).find("input").eq(i).val());
        }
        for (g = 0; g < 9; g++) {
            var check = column[g];
            checked.push(check);
            if (check != "" && checked.indexOf(check) != checked.lastIndexOf(check)) {
                return false;
            }
        }
    }
    for (i = 0; i < 9; i++) {
        var three = [];
        for (j = 0; j < 3; j++) {
            switch (i) {
                case 0:
                    for (g = 1; g < 4; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j).val());
                    }
                    break;
                case 1:
                    for (g = 1; g < 4; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j + 3).val());
                    }
                    break;
                case 2:
                    for (g = 1; g < 4; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j + 6).val());
                    }
                    break;
                case 3:
                    for (g = 4; g < 7; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j).val());
                    }
                    break;
                case 4:
                    for (g = 4; g < 7; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j + 3).val());
                    }
                    break;
                case 5:
                    for (g = 4; g < 7; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j + 6).val());
                    }
                    break;
                case 6:
                    for (g = 7; g < 10; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j).val());
                    }
                    break;
                case 7:
                    for (g = 7; g < 10; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j + 3).val());
                    }
                    break;
                case 8:
                    for (g = 7; g < 10; g++) {
                    var row = "#" + g.toString();
                    three.push($(row).find("input").eq(j + 6).val());
                    }
                    break;
            }
        }
        var checked = [];
        for (j = 0; j < 9; j++) {
            var check = three[j];
            checked.push(check);
            if (check != "" && checked.indexOf(check) != checked.lastIndexOf(check)) {
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
            if ($("input").eq(pos).val() === "") {
                empty.push(pos);
            }
        }
        for (cell = 0; cell < empty.length;) {
            var current = $("input").eq(empty[cell]);
            if (current.val() === "") {
                current.val("0");
            }
            var value = parseInt(current.val()) + 1;
            var found = false;
            current.val(value.toString());
            while (found != true && value < 10)  {
                if (validate() === true) {
                    found = true;
                    cell++;
                }
                else {
                    value++;
                    current.val(value.toString());
                }
            }
            if (found != true) {
                current.val("");
                cell--;
            }
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