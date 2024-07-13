// Tic-Tac-Toe board represented as a 3x3 array
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Players
let human = 'O';
let ai = 'X';
let currentPlayer = human;

// Scores for minimax
let scores = {
    X: 1,
    O: -1,
    tie: 0
};

// Function to check if there's a winner or tie
function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }
    
    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }
    
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    
    // Check for tie
    let isFull = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                isFull = false;
                break;
            }
        }
        if (!isFull) {
            break;
        }
    }
    if (isFull) {
        return 'tie';
    }
    
    // No winner yet
    return null;
}

// Function to make AI move using minimax algorithm
function bestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(board, 0, false);
                board[i][j] = ''; // Undo the move
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

    // Make the best move
    board[move.i][move.j] = ai;
    currentPlayer = human;
    render();
    if (checkWinner() !== null) {
        gameOver();
    }
}

// Minimax algorithm function
function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = ''; // Undo the move
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = ''; // Undo the move
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

// Function to handle human player's move
function humanMove(row, col) {
    if (board[row][col] === '' && currentPlayer === human) {
        board[row][col] = human;
        currentPlayer = ai;
        render();
        if (checkWinner() === null) {
            setTimeout(bestMove, 500); // AI makes its move after 0.5s delay
        } else {
            gameOver();
        }
    }
}

// Function to render the board
function render() {
    let display = document.getElementById('board');
    display.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = board[i][j];
            cell.addEventListener('click', function() {
                if (currentPlayer === human) {
                    humanMove(i, j);
                }
            });
            display.appendChild(cell);
        }
    }
}

// Function to display game over message
function gameOver() {
    let result = checkWinner();
    if (result === 'tie') {
        alert('It\'s a tie!');
    } else {
        alert(`${result} wins!`);
    }
    resetGame();
}

// Function to reset the game
function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = human;
    render();
}

// Initialize the game
render();
