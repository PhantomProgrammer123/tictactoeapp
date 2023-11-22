document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');
    const screen = document.getElementById('screen');
    const screenText = document.getElementById('screenText');
    const screenBtn = document.getElementById('screenBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    // Handle cell click
    function cellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        renderBoard();

        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            showResult('It\'s a tie!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Check if the board is full
    function isBoardFull() {
        return !gameBoard.includes('');
    }

    // Show the result screen
    function showResult(message) {
        result.textContent = message;
        screenText.textContent = message;
        screen.classList.add('active');
    }

    // Reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        result.textContent = '';
        renderBoard();
        screen.classList.remove('active');
    }

    // Render the Tic Tac Toe board
    function renderBoard() {
        gameBoard.forEach((value, index) => {
            const cell = board.children[index];
            cell.textContent = value;
        });
    }

    // Event listener for the reset button
    resetBtn.addEventListener('click', resetGame);

    // Event listener for the screen button
    screenBtn.addEventListener('click', resetGame);

    // Initial render
    renderBoard();
});
