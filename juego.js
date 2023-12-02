const board = document.getElementById('board');
const colors = ['red', 'yellow', 'green'];
const maxCells = 20;
let cells = [];

function createCell() {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    cell.classList.add(randomColor);
    cell.addEventListener('click', () => handleCellClick(cell));
    board.appendChild(cell);
    cells.push(cell);
}

function handleCellClick(clickedCell) {
    const index = cells.indexOf(clickedCell);
    const color = clickedCell.classList[1];

    if (event.ctrlKey) {
        if (index < cells.length - 1) {
            const nextColor = cells[index + 1].classList[1];
            cells[index].classList.replace(color, nextColor);
            cells[index + 1].classList.replace(nextColor, color);
        }
    } else {
        let count = 1;
        let i = index - 1;
        while (i >= 0 && cells[i].classList.contains(color)) {
            count++;
            i--;
        }
        i = index + 1;
        while (i < cells.length && cells[i].classList.contains(color)) {
            count++;
            i++;
        }
        if (count >= 3) {
            cells = cells.filter((cell, idx) => !(idx >= i - count && idx < i));
            board.innerHTML = '';
            cells.forEach(cell => board.appendChild(cell));
            checkGameStatus();
        }
    }
}

function addNewCell() {
    if (cells.length < maxCells) {
        createCell();
    } else {
        clearInterval(interval);
        alert('¡Has perdido!');
        resetGame();
    }
}

const interval = setInterval(addNewCell, 2000);

function moveCellRight() {
    const selectedIndex = cells.findIndex(cell => cell.classList.contains('selected'));
    if (selectedIndex !== -1 && selectedIndex < cells.length - 1) {
        const selectedCell = cells[selectedIndex];
        const nextCell = cells[selectedIndex + 1];
        const selectedColor = selectedCell.classList[1];
        const nextColor = nextCell.classList[1];

        selectedCell.classList.replace(selectedColor, nextColor);
        nextCell.classList.replace(nextColor, selectedColor);
        checkGameStatus();
    }
}
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'ArrowRight') {
        event.preventDefault();
        moveCellRight();
    }
});

function checkGameStatus() {
    if (cells.length === 0) {
        clearInterval(interval);
        alert('¡Has ganado!');
        resetGame();
    }
}

function resetGame() {
    cells = [];
    board.innerHTML = '';
    clearInterval(interval);
    interval = setInterval(addNewCell, 2000);
}