import { COL, INITIAL_COLOR, PATH_COLOR, ROW, TARGET_COLOR, TIMEOUT, VISITED_COLOR, WALL_COLOR, MAZETIMEOUT } from "../constants";

export default class PathFinder {

    constructor(begin, end, updateSquare, board, setIsDrawing) {
        this.begin = begin
        this.end = end
        this.updateSquare = updateSquare
        this.board = board;
        this.setIsDrawing = setIsDrawing

        //initialize dist and prev graphs
        this.dist = []
        this.prev = []
        for(let i = 0; i < COL; i++) {
            this.dist[i] = []
            this.prev[i] = []

            for(let j = 0; j < ROW; j++){
                this.dist[i][j] = Infinity
                this.prev[i][j] = {x: -1, y: -1}
            }
        }
        this.dist[this.begin.x][this.begin.y] = 0;
    }

    drawShortestPath = () => {
        let path = []

        let timeout = 0

        let v = {x: this.end.x, y: this.end.y}
        
        while(this.prev[v.x][v.y].x != -1 && this.prev[v.x][v.y].y != -1){
            path.push({x: v.x, y: v.y})
            let tempx = v.x
            let tempy = v.y
            v = {x: this.prev[tempx][tempy].x, y: this.prev[tempx][tempy].y}
        } 
        path.push({x: this.begin.x, y: this.begin.y})

        path.reverse()

        for(let i = 0; i < path.length; i++){
            this.updateSquare(path[i].x, path[i].y, PATH_COLOR, timeout)
            timeout += TIMEOUT
        }

        setTimeout(this.setIsDrawing(false), timeout)
    }

    drawMaze = () => {
        let bx = this.begin.x
        let by = this.begin.y

        let shuffle = (a) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        let carvePassage = (x, y) => {
            let directions = [0, 1, 2, 3]
            shuffle(directions)

            this.updateSquare(x, y, WALL_COLOR)
            for(let i = 0; i < directions.length; i++) {
                //get new cell

                console.log(directions[i])
                const nx = x + (PathFinder.xNext[directions[i]] * 2)
                const ny = y + (PathFinder.yNext[directions[i]] * 2)

                if(nx >= 0 && nx < COL 
                    && ny >= 0 && ny < ROW) {
                        if(grid[nx][ny] == 0) {
                            //set traveled 
                            //update between
                            this.updateSquare(
                                x + PathFinder.xNext[directions[i]],
                                y + PathFinder.yNext[directions[i]],
                                INITIAL_COLOR,
                                timeout
                            )
                            timeout += MAZETIMEOUT

                            //update current
                            this.updateSquare(x, y, INITIAL_COLOR, timeout)
                            timeout += MAZETIMEOUT
                            grid[nx][ny] = 1
                            carvePassage(nx, ny)
                        }
                        this.updateSquare(x, y, INITIAL_COLOR, timeout)
                        timeout += MAZETIMEOUT
                    }
            }
        }

        let timeout = 0
        let grid = [...Array(ROW)].map(x=>Array(COL).fill(0)) 
        grid[bx][by] = 1   

        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid.length; j++) {
                if(this.board[i][j] == TARGET_COLOR) continue;
                this.updateSquare(i, j, WALL_COLOR)
            }
        }
    
        carvePassage(bx, by)
        this.updateSquare(this.end.x, this.end.y, TARGET_COLOR, timeout)
        
    }

    //use these for traversing neighbors in algos
    static xNext = [1, -1,  0,  0]
    static yNext = [0,  0,  1, -1]
}