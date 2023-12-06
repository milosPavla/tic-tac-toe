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
    
    return {username, points, addPoint, getPoints};
}

function playerMove(e) {
    let field = e.target;

    checkField(field);

    checkWinner(fieldArr);
}

function checkField(field) {
    if(field.textContent == "") {
        markField(field);
        game1.changeOrder();
    }
    else {
        alert("Field is not available!");
    }
}

function markField(field) {
    if(game1.checkOrder() == true) {
        field.textContent = "X";
    }
    else {
        field.textContent = "O";
    }
}

function showPlayerWinner() {
    if(game1.checkOrder() == true) {
        console.log("Player 1 winner!");
        player1.addPoint();
    }
    else {
        console.log("Player 2 winner!");
        player2.addPoint();
    }
}

function checkWinner(fieldArr) {
    let symbolMatrix = [[], [], []];

    for(let i = 0; i < 3; i ++ ) {
        for(let j = 0; j < 3; j ++ ) {
            symbolMatrix[i][j] = fieldArr[3 * i + j].textContent;
        }
    }

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


const fieldArr = document.querySelectorAll('.field');

fieldArr.forEach(field => {
    field.addEventListener('click', playerMove);
});

const game1 = createGame();

const player1 = createPlayer("milosPavla");
const player2 = createPlayer("slakiCar");
