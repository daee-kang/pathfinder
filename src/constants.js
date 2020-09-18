//colors for board
export const INITIAL_COLOR  = "#D3D3D3"
export const VISITED_COLOR  = "#89cff0"
export const PATH_COLOR     = "blue"
export const WALL_COLOR     = "black"
export const TARGET_COLOR   = "#ff6961"
export const START_COLOR    = "#FDFD96"

//board
export const BOARD = []

for (let i = 0; i < 10; i++) {
    BOARD[i] = [];
    for(let j = 0; j < 10; j++) {
        BOARD[i][j] = {
            color: INITIAL_COLOR,
            visit: false
        }
    }
}