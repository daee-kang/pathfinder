import React, { useContext } from 'react'
import { Context } from '../Provider'

import './Header.scss'

const Header = () => {
    const context = useContext(Context)
    const { 
        begin,
        end,
        updateSquare,
        isPathExist,
        isVisualized,
        setIsPathExist,
        setIsVisualized,
        board
    } = context;

    const search = () => {
        if(isVisualized) return

        setIsVisualized(true)

        
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
        </div>
    )
}

export default Header