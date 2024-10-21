let isSelecting = false;  // Flag to track if a selection is in progress
let selectionStart = { row: -1, col: -1 };  // Starting point of the selection

/**
 * Handles the mousedown event to initiate the selection
 */
const handleMouseDown = (row: number, col: number) => {
    isSelecting = true;
    selectionStart = { row, col };

    // Select and focus the starting input field
    focusAndSelectCell(row, col);
};

/**
 * Handles the mousemove event to select and focus cells during the drag
 */
const handleMouseMove = (row: number, col: number) => {
    if (isSelecting) {
        const rowStart = Math.min(selectionStart.row, row);
        const rowEnd = Math.max(selectionStart.row, row);
        const colStart = Math.min(selectionStart.col, col);
        const colEnd = Math.max(selectionStart.col, col);

        // Loop through the range and focus/select each input field
        for (let r = rowStart; r <= rowEnd; r++) {
            for (let c = colStart; c <= colEnd; c++) {
                focusAndSelectCell(r, c);
            }
        }
    }
};

/**
 * Handles the mouseup event to end the selection
 */
const handleMouseUp = () => {
    isSelecting = false;
};

/**
 * Focus and visually select the cell at the given row and column
 */
const focusAndSelectCell = (row: number, col: number) => {
    const cellId = `${row}-${col}`;
    const inputElement = document.getElementById(cellId) as HTMLInputElement;

    if (inputElement) {
        // inputElement.focus();
        inputElement.classList.add('border-blue-800');
    }
};

export { handleMouseDown, handleMouseMove, handleMouseUp };