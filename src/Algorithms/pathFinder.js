export default class PathFinder {
    constructor(begin, end, updateSquare, board) {
        this.begin = begin
        this.end = end
        this.updateSquare = updateSquare
        this.board = board;

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
            dist[this.begin.x][this.begin.y] = 0;
        }
    }
}