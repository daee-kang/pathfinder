import { PATH_COLOR } from "../constants";

export default class PathFinder {

    constructor(begin, end, updateSquare, board) {
        this.begin = begin
        this.end = end
        this.updateSquare = updateSquare
        this.board = board;

        console.log(this)

        //initialize dist and prev graphs
        this.dist = new Array(10)
        this.prev = new Array(10)
        for(let i = 0; i < 10; i++) {
            this.dist[i] = []
            this.prev[i] = []

            for(let j = 0; j < 10; j++){
                this.dist[i][j] = Infinity
                this.prev[i][j] = {x: -1, y: -1}
            }
            //this.dist[this.begin.x][this.begin.y] = 0;
        }
    }

    drawShortestPath = () => {
        let path = []

        let v = {x: this.end.x, y: this.end.y}
        while(v.x != this.begin.x && v.y != this.begin.y){
            v = this.prev[v.x][v.y]
            path.push(v)
        }

        path.reverse()

        let timeout = 100
        for(let i = 0; i < path.size(); i++){
            this.updateSquare(path[i].x, path[i].y, PATH_COLOR, timeout)
            timeout += 100
        } 
    }

    //use these for traversing neighbors in algos
    static xNext = [1, -1,  0,  0]
    static yNext = [0,  0,  1, -1]
}