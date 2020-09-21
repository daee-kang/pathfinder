import React, { useContext } from 'react'
import { Context } from '../Provider'
import PathFinder from '../Algorithms/pathFinder'

import './Header.scss'
import Dijkstra from '../Algorithms/dijkstra'

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

    const search = () => {
        if(isVisualized) return

        setIsVisualized(true)

        pathFinder.current = new Dijkstra(begin.current, end.current, updateSquare, board.current)
        pathFinder.current.execute()
    }

    const drawMaze = () => {
        if(isVisualized) return

        PathFinder.drawMaze(begin.current.x, begin.current.y, updateSquare)
    }

    
    return (
        <div className="header">
            <ul className="algo-picker">
                <li className="algo-item">fdsa</li>
                <li className="algo-item">fdaeg</li>
                <li className="algo-item">bzb</li>
                <li className="algo-item">geageh</li>
                <li className="algo-item">nsgdsg</li>
            </ul>

            <button onClick={search}>search</button>
            <button onClick={clearBoard}>clear</button>
            <button onClick={drawMaze}>draw maze</button>
        </div>
    )
}

export default Header