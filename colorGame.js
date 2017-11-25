var edition = true;
var  numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var editionButton = document.querySelector("#edition");

init();

function init () {
  setupModeButtons();
  setupSquares();
  reset();

  resetButton.addEventListener("click", function() {
    reset();
  });

  editionButton.addEventListener("click", function() {
    editionChange();
    reset();
  });
}

function editionChange() {
  if(edition) {
    edition = false;
    editionButton.textContent = "RGB";
  } else {
    edition = true;
    editionButton.textContent = "HEX";
  }
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if(this.textContent === "Easy") {
        numOfSquares = 3;
      } else if(this.textContent === "Hard") {
        numOfSquares = 9;
      } else {
        numOfSquares = 6;
      }
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor || rgbToHex(clickedColor) === pickedColor) {
        changeColors(clickedColor);
        messageDisplay.textContent = "Correct!";
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again!";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  for (var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];
  if(edition) {
    for (var i = 0; i < num; i++) {
      arr.push(randomRgbColor())
    }
  } else {
    for (var i = 0; i < num; i++) {
      arr.push(randomHexColor())
    }
  }
  return arr;
}

function randomRgbColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomHexColor() {
  var hex = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
  var hexColor = "";
  for (var i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * 16)];
  }
  return "#"+hexColor;

}

function rgbToHex(col) {
  if(col.charAt(0) == 'r')
  {
    col = col.replace('rgb(','').replace(')','').split(',');
    var r = parseInt(col[0], 10).toString(16);
    var g = parseInt(col[1], 10).toString(16);
    var b = parseInt(col[2], 10).toString(16);
    r = r.length == 1 ? '0' + r : r;
    g = g.length == 1 ? '0' + g : g;
    b = b.length == 1 ? '0' + b : b;
    var colHex = '#' + r + g + b;
    return colHex.toUpperCase();
  }
}
