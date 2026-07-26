// Core logic of the mind-reading trick.
//
// Round 1: the shuffled alphabet is laid out in `nameLength` columns and the
// player points at the column of each letter of their name. Round 2: each
// chosen column becomes a row of a new grid. When the player points at the
// column of their letter again, (row, column) pins the letter down exactly —
// the app never needs to know the name in advance.

export const MIN_LETTERS = 3;
export const MAX_LETTERS = 10;

export function shuffledAlphabet() {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

/** Lay letters out row by row into `cols` columns (last cells may be ""). */
export function buildRows(letters, cols) {
  const rowCount = Math.ceil(letters.length / cols);
  return Array.from({ length: rowCount }, (_, r) =>
    Array.from({ length: cols }, (_, c) => letters[r * cols + c] ?? "")
  );
}

/**
 * Build the round-2 letter sequence: for each selected column (0-based),
 * collect that column's letters top-to-bottom; they become one row of the
 * next grid. Gaps are backfilled with letters the player did not select so
 * the grid gives nothing away.
 */
export function buildSecondLetters(shuffled, selections, cols) {
  const rowCount = Math.ceil(shuffled.length / cols);
  const picked = [];
  selections.forEach((col) => {
    for (let k = 0; k < rowCount; k++) {
      picked.push(shuffled[col + k * cols]);
    }
  });
  const unused = shuffled.filter((letter) => !picked.includes(letter));
  return picked.map((letter) => letter ?? unused.pop() ?? "");
}

/** Read the name: letter i sits at (row i, selected column) of grid 2. */
export function readName(secondLetters, selections, cols2) {
  return selections
    .map((col, i) => secondLetters[i * cols2 + col] ?? "?")
    .join("");
}
