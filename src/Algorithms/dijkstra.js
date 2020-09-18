import { VISITED_COLOR, WALL_COLOR } from "../constants";
import PathFinder from "./pathFinder";

export default class Dijkstra extends PathFinder {
    constructor(begin, end, updateSquare, board) {
        super(begin, end, updateSquare, board)
    }

    execute = () => {
        let timeout = 100;
        let found = false

        //using poor mans queue here :-p
        let q1 = []
        let q2 = []

        q1.push({x: this.begin.x, y: this.begin.y})

        while(q1.length) {
            for(let currIdx = 0; currIdx < q1.length; currIdx++) {
                let v = q1[currIdx]
                
                for(let i = 0; i < 4; i++) { //visit neighbors
                    let newx = v.x + PathFinder.xNext[i]
                    let newy = v.y + PathFinder.yNext[i]

                    //boundary check
                    if(newx < 0 || newx >= 10 || newy < 0 || newy >= 10) continue
                    //skip if already checked
                    if(this.board[newx][newy] == VISITED_COLOR) continue
                    //skip if wall here
                    if(this.board[newx][newy] == WALL_COLOR) continue

                    //dijkstra stuff here
                    if(this.dist[v.x][v.y] == Infinity || 
                        this.dist[v.x][v.y] + 1 >= this.dist[newx][newy]) continue;

                    this.dist[newx][newy] = this.dist[v.x][v.y] + 1;
                    this.prev[newx][newy] = {x: v.x, y: v.y}

                    //we found 
                    if(newx == this.end.x && newy == this.end.y) {
                        setTimeout(() => {
                            console.log("shitter")
                            this.drawShortestPath()
                        }, timeout)
                        return
                    }
                    this.updateSquare(newx, newy, VISITED_COLOR, timeout)
                    q2.push({x: newx, y: newy})
                }
            }
            timeout += 100

            q1 = q2
            q2 = []

        }
    }
}