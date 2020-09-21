import { COL, PATH_COLOR, ROW, TIMEOUT } from "../constants";

export default class PathFinder {

    constructor(begin, end, updateSquare, board) {
        this.begin = begin
        this.end = end
        this.updateSquare = updateSquare
        this.board = board;


        console.log(this)

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
        console.log(this.prev)
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

        
    }

    //use these for traversing neighbors in algos
    static xNext = [1, -1,  0,  0]
    static yNext = [0,  0,  1, -1]
}