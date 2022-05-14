const direction = ["N", "E", "S", "W"];
let rowCount = 0;
let columnCount = 0;

let coordA = {
  name: "A",
  x: 0,
  y: 0,
  d: "",
};

let coordB = {
  name: "B",
  x: 0,
  y: 0,
  d: "",
};

let commandsA = [];
let commandsB = [];

function initialize() {
  // set plateau size
  rowCount = parseInt(document.getElementById("txtPlateauRowCount").value);
  columnCount = parseInt(
    document.getElementById("txtPlateauColumnCount").value
  );

  // set rover's coordinates
  setCoord(coordA);
  setCoord(coordB);

  // set movement rotation
  commandsA = $("#txtCommandA").val().split("");
  commandsB = $("#txtCommandB").val().split("");
}

$(document).ready(() => {
  initialize();
  $("#btnGo").click(() => {
    updateResult(undefined);
    process(commandsA, coordA);
  });
});

function process(commands, coord) {
  commands.map((val, index) => {
    setTimeout(() => {
      if (val === "L" || val === "R") {
        turn(val, coord);
      } else if (val === "M") {
        move(coord);
      }

      updateResult(coord);

      if (coord.name === "A" && index === commandsA.length - 1)
        process(commandsB, coordB);
    }, 2000 + index * 100);
  });
}

function turn(command, paramCoord) {
  if (command === "L") {
    var currentDirectionIndex = direction.indexOf(paramCoord.d);
    if (currentDirectionIndex > 0) {
      paramCoord.d = direction[currentDirectionIndex - 1];
    } else {
      paramCoord.d = direction[direction.length - 1];
    }
  } else if (command === "R") {
    var currentDirectionIndex = direction.indexOf(paramCoord.d);
    if (currentDirectionIndex < direction.length - 1) {
      paramCoord.d = direction[currentDirectionIndex + 1];
    } else {
      paramCoord.d = direction[0];
    }
  }
}

function move(paramCoord) {
  if (paramCoord.d === "N" && paramCoord.y < columnCount) {
    paramCoord.y += 1;
  } else if (paramCoord.d === "S" && paramCoord.y > 0) {
    paramCoord.y -= 1;
  } else if (paramCoord.d === "W" && paramCoord.x > 0) {
    paramCoord.x -= 1;
  } else if (paramCoord.d === "E" && paramCoord.x < rowCount) {
    paramCoord.x += 1;
  }
}

function setCoord(coord) {
  coord.x = parseInt(document.getElementById("txtX" + coord.name).value);
  coord.y = parseInt(document.getElementById("txtY" + coord.name).value);
  coord.d = document.getElementById("txtDirect" + coord.name).value;
}

function updateResult(coord) {
  if (coord === undefined) {
    document.getElementById("resultA").innerText = "";
    document.getElementById("resultB").innerText = "";

    return false;
  }
  let elResult = document.getElementById("result" + coord.name);
  elResult.innerText = elResult.innerText +=
    "Coordinate X: " +
    coord.x +
    " Y: " +
    coord.y +
    " Direction: " +
    coord.d +
    "}\n";
}
