//colors for board
export const INITIAL_COLOR  = "#f6f6f6"
export const VISITED_COLOR  = "#ffe2e2"
export const PATH_COLOR     = "#90ee90"
export const WALL_COLOR     = "#838383"
export const TARGET_COLOR   = "#ff6961"
export const START_COLOR    = "#1aa6b7"

//board
export const BOARD = []
export const COL = 20
export const ROW = 20
export const TIMEOUT = 50

for (let i = 0; i < COL; i++) {
    BOARD[i] = [];
    for(let j = 0; j < ROW; j++) {
        BOARD[i][j] = INITIAL_COLOR
    }
}