var counter = 0;
var turns = 0;
var xArray = [];
var oArray =[];
var xScore = 0;
var oScore = 0;

$(function() {
  $(".square").click(function() {
    if ($(this).hasClass("0") && counter === 0) {
      $(this).removeClass("0");
      $(this).addClass("O");
      $(this).text("O").css("color", "yellow");
      counter = 1;
      turns +=1;
      var outernumber = parseInt($(this).parent("").attr("value"));
      var innernumber = parseInt($(this).attr("value"));
      oArray.push([outernumber, innernumber]);
      won(oArray);
    } else if ($(this).hasClass("0") && counter === 1) {
      $(this).removeClass("0");
      $(this).addClass("X");
      $(this).text("X").css("color", "purple");
      counter = 0;
      turns +=1;
      var xouternumber = parseInt($(this).parent("").attr("value"));
      var xinnernumber = parseInt($(this).attr("value"));
      xArray.push([xouternumber, xinnernumber]);
      won(xArray);
    } else {
      return;
    }
    if (turns === 10) {
      $(".banner").text("CAT!");
    }

  });
  $(".new-game").click(function() {
    oArray = [];
    xArray = [];
    counter = 0;
    turns = 0;
    $(".square").text("").removeClass("O").removeClass("X").addClass("0");
    $("body").css("background-color", "white");
    $("h1").css("color", "black");
    $(".banner").text("").css("color", "black");
  });
  $(".clear-score").click(function() {
    oScore = 0;
    xScore = 0;
    $(".xScore").text(0);
    $(".oScore").text(0);
  });
});

function won(player) {
  var diagnalUp = [[2, 0], [1, 1], [0, 2]];
  var diagnalDown = [[0, 0], [1, 1], [2, 2]];
  var topRow = [[0, 0], [0, 1], [0, 2]];
  var middleRow = [[1, 0], [1, 1], [1, 2]];
  var bottomRow = [[2, 0], [2, 1], [2, 2]];
  var firstCol = [[0, 0], [1, 0], [2, 0]];
  var secondCol = [[0, 1], [1, 1], [2, 1]];
  var thirdCol = [[0, 2], [1, 2], [2, 2]];
  var winners = [diagnalUp, diagnalDown, topRow, middleRow, bottomRow, firstCol, secondCol, thirdCol];

  var Xwon = winners.some(function(combo) {
    return combo.every(function(comboCoord) {
      return xArray.some(function(coord) {
        return comboCoord[0] === coord[0] && comboCoord[1] === coord[1];
      });
    });
  });

  var Owon = winners.some(function(combo) {
    return combo.every(function(comboCoord) {
      return oArray.some(function(coord) {
        return comboCoord[0] === coord[0] && comboCoord[1] === coord[1];
      });
    });
  });
  if (Xwon) {
    xScore += 1;
    $("body").css("background-color", "purple");
    $("h1").css("color", "white");
    $(".banner").text("X WINS!").css("color", "white");
    counter = 2;
    $(".xScore").text(xScore);
  } else if (Owon) {
    oScore += 1;
    $("body").css("background-color", "yellow");
    $(".banner").text("O WINS!").css("color", "black");
    counter = 2;
    $(".oScore").text(oScore);
  } else {
    return;
  }
}
