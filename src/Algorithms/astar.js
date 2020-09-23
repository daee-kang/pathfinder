import PathFinder from "./pathFinder";
import { ROW, COL, VISITED_COLOR, TIMEOUT, WALL_COLOR } from '../constants'
import PriorityQueue from 'js-priority-queue'

//f(x) = h(x) + g(x)

/*
    we will use dist as container for f(x) here
*/
export default class AStar extends PathFinder {
    constructor(begin, end, updateSquare, board, setIsDrawing) {
        super(begin, end, updateSquare, board, setIsDrawing)

        this.open = new PriorityQueue({ comparator: (a, b) => {
            return a.f - b.f
        }})

        this.closed = new Array(ROW);
        for (let i = 0; i < ROW; i++) {
          this.closed[i] = new Array(COL).fill(false);
        }
    }

    //manhattan distance heuristic - use this as it's best for grid like pathfinding (4 direction in our case)
    h = (x, y) => {
        return Math.abs(x - this.end.x) + Math.abs(y - this.end.y)
    }

    execute = () => {
        let timeout = TIMEOUT

        let { begin, end, open, closed } = this

        //1. add starting point to open list
        open.queue({x: begin.x, y: begin.y, f: this.h(begin.x, begin.y)})
        closed[begin.x][begin.y] = true

        while(open.length) {
            //pop node off open list
            let curr = open.peek()
            open.dequeue()
            closed[curr.x][curr.y] = false

            if(curr.x == end.x && curr.y == end.y) {
                setTimeout(() => {
                    this.drawShortestPath()
                }, timeout)
                return
            }

            for(let i = 0; i < PathFinder.xNext.length; i++) {
                let newx = curr.x + PathFinder.xNext[i]
                let newy = curr.y + PathFinder.yNext[i]
                
                //boundary check 
                if(newx < 0 && newx >= COL && newy < 0 && newy >= ROW) continue;
                //boundary check
                if(newx < 0 || newx >= ROW || newy < 0 || newy >= COL) continue
                //skip if already checked
                if(this.board[newx][newy] == VISITED_COLOR) continue
                //skip if wall here
                if(this.board[newx][newy] == WALL_COLOR) continue

                const g = this.dist[curr.x][curr.y] + 1
                const newf = g + this.h(newx, newy)

                if(g < this.dist[newx][newy]) {
                    this.prev[newx][newy] = {x: curr.x, y: curr.y}
                    this.dist[newx][newy] = g;

                    this.updateSquare(newx, newy, VISITED_COLOR, timeout)
                    timeout += TIMEOUT

                    if(this.closed[newx][newy] === false) {
                        open.queue({x: newx, y: newy, f: newf})
                        closed[newx][newy] = true;
                    }
                }
            }      
        }
        setTimeout(this.setIsDrawing(false), timeout)
    }
}