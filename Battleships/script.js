﻿var ships1 = [];
var ships2 = [];
var promptBool = true;
var ships1Count = 0;
var ships2Count = 0;
for (let c of shipLengths) {
    ships1Count += c;
    ships2Count += c;
}
var clickInput = [1, 1];
var typeInput = [0, 0];
var checkIndex;
var player1Name = "Player 1";
var player2Name = "Player 2";
var turnDelay = 4500;
var turn = 1;
var countdown;
var count = 0;
var roundTime = 15;
$(".lds-ring").hide();
$(".player2Prompt").hide();
$(".ship1Prompt").hide();
$(".ship2Prompt").hide();
$(".prompt").hide();
$(".hitmiss").hide();
$(".gameover").hide();


// setup ships
for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
        ships1.push(false);
        ships2.push(false);
    }
}


// setup grid for player 1
for (let j = gridNum; j > 0; j--) {
    for (let i = 1; i <= gridNum; i++) {
        let newBox = document.createElement('div');

        newBox.onclick = () => {
            if (promptBool == true || newBox.classList.contains("hit") || newBox.classList.contains("miss2")) return;
            newBox.classList.toggle("prompted");
            $(".prompt").show();
            promptBool = true;
            checkIndex = (i - 1) + (j - 1) * gridNum;
            clickInput = [i, j];
        };

        newBox.className = "box";
        newBox.id = "1".concat(i.toString().concat(j.toString()));
        // newBox.innerHTML = i.toString().concat(j.toString());
        document.getElementById("gridcontainer1").appendChild(newBox);
    }
}

// setup grid for player 2
for (let j = gridNum; j > 0; j--) {
    for (let i = 1; i <= gridNum; i++) {
        let newBox = document.createElement('div');

        newBox.onclick = () => {
            if (promptBool == true || newBox.classList.contains("hit") || newBox.classList.contains("miss2")) return;
            newBox.classList.toggle("prompted");
            $(".prompt").show();
            promptBool = true;
            checkIndex = (i - 1) + (j - 1) * gridNum;
            clickInput = [i, j];
        };
        newBox.className = "box";
        newBox.id = "-1".concat(i.toString().concat(j.toString()));
        // newBox.innerHTML = i.toString().concat(j.toString());
        document.getElementById("gridcontainer2").appendChild(newBox);
    }
}

// setup axis labels
for (let i = gridNum; i > 0; i--) {
    let newBox = document.createElement('div');
    newBox.className = "ylabelbox";
    newBox.innerHTML = i;
    document.getElementById("ylabel").appendChild(newBox);
}

for (let i = 1; i <= gridNum; i++) {
    let newBox = document.createElement('div');
    newBox.className = "xlabelbox";
    newBox.innerHTML = i;
    document.getElementById("xlabel").appendChild(newBox);
}

//Initialise names
document.getElementById("turnReminder").innerHTML = "Enter <span style='font-weight: bold'>Player 1's</span> name!";
$(".gridcontainer1").show();
$(".gridcontainer2").hide();

function submitName1() {
    player1Name = document.getElementById("player1Name").value;
    $(".player1Prompt").hide();
    $(".player2Prompt").show();
    document.getElementById("turnReminder").innerHTML = "Enter <span style='font-weight: bold;'>Player 2's</span> name!";
}

function submitName2() {
    player2Name = document.getElementById("player2Name").value;
    $(".player2Prompt").hide();
    $(".ship1Prompt").show();
    document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player1Name + "'s</span> turn to select ship positions!";
    generateShip(ships1);
}

function submitShip1() {
    //reset board
    for (let j = gridNum; j > 0; j--) {
        for (let i = 1; i <= gridNum; i++) {
            let index = turn.toString().concat(i.toString()).concat(j.toString());
            $("#" + index).removeClass();
            $("#" + index).addClass("box");
        }
    }

    turn *= -1;
    $(".gridcontainer1").hide();
    $(".ship1Prompt").hide();
    $(".gridcontainer2").show();
    $(".ship2Prompt").show();
    document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player2Name + "'s</span> turn to select ship positions!";
    generateShip(ships2);

}

function submitShip2() {
    //reset board
    for (let j = gridNum; j > 0; j--) {
        for (let i = 1; i <= gridNum; i++) {
            let index = turn.toString().concat(i.toString()).concat(j.toString());
            $("#" + index).removeClass();
            $("#" + index).addClass("box");
        }
    }

    //get ready
    $(".lds-ring").show();
    $(".gridcontainer2").hide();
    $(".ship2Prompt").hide();
    $(".gridcontainer1").show();
    document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player1Name + "</span>, get ready!";


    setTimeout(() => {
        turn *= -1;
        $(".lds-ring").hide();
        document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player1Name + "'s</span> turn to attack!";
        promptBool = false;
        alert("START!");
        timer(roundTime);
    }, 3000);
}

function generateShip(ship) {
    //reset board
    for (let j = gridNum; j > 0; j--) {
        for (let i = 1; i <= gridNum; i++) {
            let index = turn.toString().concat(i.toString()).concat(j.toString());
            $("#" + index).removeClass();
            $("#" + index).addClass("box");
        }
    }

    for (i = 0; i < ship.length; i++) {
        ship[i] = false;
    }



    //begin randomiser

    for (let n = 1; n <= shipLengths.length; n++) { //GENERATE RANDOM SHIP POSITIONS
        while (true) {
            var orientation = Math.round(Math.random()); //0 for horizontal, 1 for vertical
            var X = Math.round(Math.random() * (gridNum - 1)) + 1;
            var Y = Math.round(Math.random() * (gridNum - 1)) + 1;
            var shipToCheck = [];

            if (orientation == 0) {
                if (X + shipLengths[n - 1] - 1 <= gridNum) { //check for walls
                    for (let i = 0; i < shipLengths[n - 1]; i++) {
                        shipToCheck.push(checkIndex = (X + i - 1) + (Y - 1) * gridNum);
                    }
                }
            } else {
                if (Y + shipLengths[n - 1] - 1 <= gridNum) { //check for walls
                    for (let i = 0; i < shipLengths[n - 1]; i++) {
                        shipToCheck.push(checkIndex = (X - 1) + (Y + i - 1) * gridNum);
                    }
                }
            }

            if (shipToCheck.length == shipLengths[n - 1]) { //if succeed in clearing wall test
                let counter = 0;
                for (let b of shipToCheck) { //check for existing ships
                    if (ship[b] == false) {
                        counter++;
                    }
                }

                if (counter == shipLengths[n - 1]) { //if succeed in clearing test with other grids
                    for (let i = 0; i < shipToCheck.length; i++) {
                        ship[shipToCheck[i]] = true;
                        if (orientation == 0) {
                            let index = turn.toString().concat((X + i).toString()).concat(Y.toString());
                            $("#" + index).toggleClass("ship" + n);
                        } else {
                            let index = turn.toString().concat(X.toString()).concat((Y + i).toString());
                            $("#" + index).toggleClass("ship" + n);
                        }
                    }
                    break;
                }
            }
        }
    }

}


function fireAway() {
    clearInterval(countdown);
    document.getElementById("timer").innerHTML = "";
    let targetBox = document.getElementById(turn.toString().concat(clickInput[0].toString().concat(clickInput[1].toString())));
    targetBox.classList.remove("prompted");
    typeInput[0] = Number(document.getElementById("promptX").value);
    typeInput[1] = Number(document.getElementById("promptY").value);
    if (clickInput[0] == typeInput[0] && clickInput[1] == typeInput[1]) {
        document.getElementById("turnReminder").innerHTML = "Attacking (" + typeInput[0] + ", " + typeInput[1] + "), ";
        if (turn == 1) { //Player 1's turn
            if (ships2[checkIndex] == true) { //hit
                alert("HIT!");
                targetBox.classList.add("hit");
                $(".prompt").hide();
                let text = player1Name + " hit " + player2Name + "!";
                document.getElementById("turnReminder").appendChild(document.createTextNode(text));
                ships2Count--;
                if (ships2Count == 0) {
                    $(".gameover").show();
                    document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player1Name + "</span> won the match!";
                }
            } else { //miss
                alert("MISS!");
                targetBox.classList.add("miss");
                setTimeout(() => {
                    targetBox.classList.remove("miss");
                    targetBox.classList.add("miss2");
                }, 3000);
                $(".prompt").hide();
                let text = player1Name + " missed " + player2Name + "!";
                document.getElementById("turnReminder").appendChild(document.createTextNode(text));
            }
        } else { //Player 2's turn
            if (ships1[checkIndex] == true) { //hit
                alert("HIT!");
                targetBox.classList.add("hit");
                $(".prompt").hide();
                let text = player2Name + " hit " + player1Name + "!";
                document.getElementById("turnReminder").appendChild(document.createTextNode(text));
                ships1Count--;
                if (ships1Count == 0) {
                    $(".gameover").show();
                    document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player2Name + "</span> won the match!";
                }
            } else { //miss
                alert("MISS!");
                targetBox.classList.add("miss");
                setTimeout(() => {
                    targetBox.classList.remove("miss");
                    targetBox.classList.add("miss2");
                }, 3000);
                $(".prompt").hide();
                let text = player2Name + " missed " + player1Name + "!";
                document.getElementById("turnReminder").appendChild(document.createTextNode(text));
            }
        }
    } else {
        if (turn == 1) {
            alert("WRONG COORDINATES!");
            document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player1Name + "</span> typed in the wrong coordinates. Attack failed!";
            $(".prompt").hide();
        } else {
            alert("WRONG COORDINATES!");
            document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player2Name + "</span> typed in the wrong coordinates. Attack failed!";
            $(".prompt").hide();
        }
    }

    // Change turn
    if (ships1Count == 0 || ships2Count == 0) return;
    changeTurn();
}


function timer(sec) {
    count = sec;
    document.getElementById("timer").innerHTML = count;
    countdown = setInterval(showTime, 1000);
}

function showTime(max) {
    if (count <= 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "";
        promptBool = true;
        $(".prompt").hide();
        let targetBox = document.getElementById(turn.toString().concat(clickInput[0].toString().concat(clickInput[1].toString())));
        targetBox.classList.remove("prompted");

        //change turn
        changeTurn();

        return;
    }
    count--;
    document.getElementById("timer").innerHTML = count;
}


function changeTurn() {
    $(".lds-ring").show();
    document.getElementById("promptX").value = "";
    document.getElementById("promptY").value = "";
    document.getElementById("turnReminder").innerHTML = "Switching turns...";
    turn *= -1;
    if (turn == 1) {
        setTimeout(() => {
            $(".gridcontainer1").show();
            $(".gridcontainer2").hide();
            document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player1Name + "'s</span> turn to attack!";
            promptBool = false;
            timer(roundTime);
            $(".lds-ring").hide();
        }, turnDelay);
    } else {
        setTimeout(() => {
            $(".gridcontainer1").hide();
            $(".gridcontainer2").show();
            document.getElementById("turnReminder").innerHTML = "<span style='font-weight: bold;'>" + player2Name + "'s</span> turn to attack!";
            promptBool = false;
            timer(roundTime);
            $(".lds-ring").hide();
        }, turnDelay);
    }
}

function alert(message) {
    document.getElementById("hitmiss").innerHTML = message;
    $(".hitmiss").toggleClass("alert");
    $(".hitmiss").show();
    setTimeout(() => {
        document.getElementById("hitmiss").innerHTML = "";
        $(".hitmiss").toggleClass("alert");
        $(".hitmiss").hide();
    }, 2000);
}