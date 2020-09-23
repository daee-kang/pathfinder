import PathFinder from "./pathFinder";
import PriorityQueue from 'js-priority-queue'
import { COL, ROW, TIMEOUT, VISITED_COLOR, WALL_COLOR } from "../constants";

export default class Bfs extends PathFinder {
    constructor(begin, end, updateSquare, board, setIsDrawing) {
        super(begin, end, updateSquare, board, setIsDrawing)

        this.visited = []
        for (let i = 0; i < ROW; i++) {
            this.visited[i] = Array(COL).fill(false);
        }
    }

    execute = () => {
        let { begin, end, updateSquare, board, visited } = this

        let timeout = TIMEOUT;

        let q1 = []
        let q2 = []

        q1.push({x: begin.x, y: begin.y})
        visited[begin.x][begin.y] = true

        while(q1.length) {
            for(let currIdx = 0; currIdx < q1.length; currIdx++) {
                let v = q1[currIdx]

                for(let i = 0; i < 4; i++) {
                    let newx = v.x + PathFinder.xNext[i]
                    let newy = v.y + PathFinder.yNext[i]

                    //boundary check
                    if(newx < 0 || newx >= ROW || newy < 0 || newy >= COL) continue
                    //skip if already checked
                    if(visited[newx][newy] == true || board[newx][newy] == VISITED_COLOR) continue
                    //skip if wall here
                    if(board[newx][newy] == WALL_COLOR) continue

                    visited[newx][newy] = true
                    this.prev[newx][newy] = {x: v.x, y: v.y}

                    //we found 
                    if(newx == this.end.x && newy == this.end.y) {
                        setTimeout(() => {
                            this.drawShortestPath()
                        }, timeout)
                        return
                    }
                    updateSquare(newx, newy, VISITED_COLOR, timeout)
                    timeout += TIMEOUT
                    q2.push({x: newx, y: newy})


                }
            }
            q1 = q2
            q2 = []
        }
        setTimeout(this.setIsDrawing(false), timeout)
    }
}