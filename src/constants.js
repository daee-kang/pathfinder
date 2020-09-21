//colors for board
export const INITIAL_COLOR  = "#D3D3D3"
export const VISITED_COLOR  = "#89cff0"
export const PATH_COLOR     = "blue"
export const WALL_COLOR     = "black"
export const TARGET_COLOR   = "#ff6961"
export const START_COLOR    = "#FDFD96"

//board
export const BOARD = []
export const COL = 20
export const ROW = 20
export const TIMEOUT = 50

for (let i = 0; i < COL; i++) {
    BOARD[i] = [];
    for(let j = 0; j < ROW; j++) {
        BOARD[i][j] = {
            color: INITIAL_COLOR,
            visit: false
        }
    }
}