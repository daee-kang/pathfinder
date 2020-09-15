//colors for board
export const INITIAL_COLOR  = "gray"
export const VISITED_COLOR  = "green"
export const PATH_COLOR     = "blue"
export const WALL_COLOR     = "green"

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