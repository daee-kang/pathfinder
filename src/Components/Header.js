import React, { useContext, useState } from 'react'
import { Context } from '../Provider'
import PathFinder from '../Algorithms/pathFinder'

import './Styles/Header.scss'
import Dijkstra from '../Algorithms/dijkstra'
import AStar from '../Algorithms/astar'
import Bfs from '../Algorithms/bfs'

const Header = () => {
    const context = useContext(Context)
    const { 
        begin,
        end,
        updateSquare,
        clearBoard,
        isPathExist,
        isVisualized,
        setIsPathExist,
        setIsVisualized,
        board,
        pathFinder
    } = context;

    const [ selectedAlgo, setSelectedAlgo ] = useState('dijkstra')

    const search = () => {
        if(isVisualized) return

        setIsVisualized(true)
        
        switch(selectedAlgo) {
            case 'dijkstra':
                pathFinder.current = new Dijkstra(begin.current, end.current, updateSquare, board.current)
                break;
            case 'astar':
                pathFinder.current = new AStar(begin.current, end.current, updateSquare, board.current)
                break;
                case 'bfs':
                pathFinder.current = new Bfs(begin.current, end.current, updateSquare, board.current)
                break;

            default:
                setIsVisualized(false)
                return
        }
        
        pathFinder.current.execute()
        setIsVisualized(false)
    }

    const drawMaze = () => {
        if(isVisualized) return

        pathFinder.current = new PathFinder(begin.current, end.current, updateSquare, board.current)
        pathFinder.current.drawMaze()
    }

    const handleChange = e => {
        console.log(e.target.value)
        setSelectedAlgo(e.target.value)
    }

    return (
        <div className="header">
            <h1 className="title">path finder</h1>
            <h2 className="subtitle">by daee kang</h2>
            <div>
                <select name="algos" value={selectedAlgo} onChange={handleChange}>
                    <option value="dijkstra">dijkstra's</option>
                    <option value="astar">a*</option>
                    <option value="bfs">bfs</option>
                </select>
                <button onClick={search}>search</button>
                <button onClick={clearBoard}>clear</button>
                <button onClick={drawMaze}>draw maze</button>
            </div>
        </div>
    )
}

export default Header