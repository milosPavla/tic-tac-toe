function createGame() {
    let order = true;

    const changeOrder = () => order = !order;

    const checkOrder = () => order;

    return {changeOrder, checkOrder};
}

function createPlayer(name) {
    const username = name;
    let points = 0;
    
    const addPoint = () => points++;

    const getPoints = () => points;

    const resetPoints = () => points = 0;
    
    return {username, points, addPoint, getPoints, resetPoints};
}

function playerMove(e) {
    let field = e.target;

    checkField(field);

    checkWinner(fieldArr);
}

function checkField(field) {
    if(field.textContent == "") {
        markField(field);
        game.changeOrder();
        scaleActivePlayer();
    }
    else {
        field.classList.add('shake');
        setTimeout(() => {
            field.classList.remove('shake');
        }, 1000);
    }
}

function markField(field) {
    if(game.checkOrder() == true) {
        field.textContent = "X";
    }
    else {
        field.textContent = "O";
    }
}

function clearFields() {
    fieldArr.forEach(field => {
        field.textContent = "";
    });
}

function showPlayerWinner() {
    if(game.checkOrder() == false) {
        player1.addPoint();
        
        document.querySelector('#score1').classList.add('winner');

        setTimeout(() => {
            document.querySelector('#score1').classList.remove('winner');
        }, 1000);
        
        if(player1.getPoints() == 3) {
            setTimeout(() => {
                player1.resetPoints();
                player2.resetPoints();

                refreshScoreInfo();

                announceWinner(1);
            }, 1000);
            
        }
    }
    else {
        player2.addPoint();
        
        document.querySelector('#score2').classList.add('winner');

        setTimeout(() => {
            document.querySelector('#score2').classList.remove('winner');
        }, 1000);

        if(player2.getPoints() == 3) {
            setTimeout(() => {
                player1.resetPoints();
                player2.resetPoints(); 

                refreshScoreInfo();

                announceWinner(2);
            }, 1000);
              
        }
    }

    refreshScoreInfo();
    clearFields();
}


function checkWinner(fieldArr) {
    setTimeout(() => {
        let symbolMatrix = [[], [], []];

        // Filling 3x3 matrix with values from array of fields
        for(let i = 0; i < 3; i ++ ) {
            for(let j = 0; j < 3; j ++ ) {
                symbolMatrix[i][j] = fieldArr[3 * i + j].textContent;
            }
        }

        // Checking if draw is active. If it's not a draw, checking for winning combination
        if(checkIfDraw()) {
            alert("It's a draw!");
            clearFields();
        }
        else {
            // Checking if any of winning layouts is present
            for(let i = 0; i < 3; i ++ ) {
                if(symbolMatrix[i][0] != "" && symbolMatrix[i][0] == symbolMatrix[i][1] && symbolMatrix[i][1] == symbolMatrix[i][2]) {
                    showPlayerWinner();
                }
            }

            for(let i = 0; i < 3; i ++ ) {
                if(symbolMatrix[0][i] != "" && symbolMatrix[0][i] == symbolMatrix[1][i] && symbolMatrix[1][i] == symbolMatrix[2][i]) {
                    showPlayerWinner();
                }
            }

            if(symbolMatrix[1][1] != "") {
                if((symbolMatrix[0][0] == symbolMatrix[1][1] && symbolMatrix[0][0] == symbolMatrix[2][2]) || 
                (symbolMatrix[0][2] == symbolMatrix[1][1] && symbolMatrix[0][2] == symbolMatrix[2][0])) {
                    showPlayerWinner();
                }
            }
        }
    }, 2000);
}

// Checking if draw is active, flag is raised by default, but if at least one field is empty, flag is put to false
function checkIfDraw() {
    let is_draw = true;

    fieldArr.forEach(field => {
        if(field.textContent === "") {
            is_draw = false;
        }
    });

    return is_draw;
}

function announceWinner(n) {
    document.querySelector(`#cont-${n}`).classList.add('final-winner');
    document.querySelector(`#score${n}`).textContent = "WINNER";
    setTimeout(() => {
        document.querySelector(`#cont-${n}`).classList.remove('final-winner');
        refreshScoreInfo();
    }, 4000);
}

function fillNames() {
    document.querySelector('#name1').textContent = player1.username;
    document.querySelector('#name2').textContent = player2.username;
}

function refreshScoreInfo() {
    document.querySelector('#score1').textContent = `Score: ${player1.getPoints()}`;
    document.querySelector('#score2').textContent = `Score: ${player2.getPoints()}`;
}

function scaleActivePlayer() {
    if(game.checkOrder() == true) {
        document.querySelector('#cont-1').classList.add('active');
        document.querySelector('#cont-2').classList.remove('active');
    }
    else {
        document.querySelector('#cont-1').classList.remove('active');
        document.querySelector('#cont-2').classList.add('active');
    }
    
}

const game = createGame();

const player1 = createPlayer("milosPavla");
const player2 = createPlayer("slakiCar");

const fieldArr = document.querySelectorAll('.field');

fillNames();

fieldArr.forEach(field => {
    field.addEventListener('click', playerMove);
});






