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

        setIsVisualized(false)
    }

    const drawMaze = () => {
        if(isVisualized) return

        pathFinder.current = new Dijkstra(begin.current, end.current, updateSquare, board.current)
        pathFinder.current.drawMaze()
    }

    return (
        <div className="header">
            <h1 className="title">path finder</h1>
            <h2 className="subtitle">by daee kang</h2>
            <div>
                <select name="algos">
                    <option value="dijkstra">dijkstra's</option>
                    <option value="dijkstra">a*</option>
                    <option value="dijkstra">pee poo</option>
                </select>
                <button onClick={search}>search</button>
                <button onClick={clearBoard}>clear</button>
                <button onClick={drawMaze}>draw maze</button>
            </div>
        </div>
    )
}

export default Header