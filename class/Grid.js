import Cell from "./Cell.js";

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
const RADIUS = 1;

export default class Grid {
  #cells;

  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", GRID_SIZE);
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    gridElement.style.setProperty("--radius", `${RADIUS}vmin`);

    this.#cells = createCellElement(gridElement).map((cellElement, i) => {
      return new Cell(cellElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE));
    });
  }

  get cells() {
    return this.#cells;
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;

      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;

      return cellGrid;
    }, []);
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

function createCellElement(gridElement) {
  const cells = [];

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cells.push(cell);
    gridElement.append(cell);
  }

  return cells;
}
