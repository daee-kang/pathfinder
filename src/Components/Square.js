import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../Provider'
import './Square.css'

import {
    INITIAL_COLOR,
    VISITED_COLOR,
    PATH_COLOR,
    WALL_COLOR
} from '../constants'

const Square = ({ridx, cidx}) => {
    const [currState, setCurrState] = useState(INITIAL_COLOR)
    const { begin, end, setIsVisualized, setCurrStateCache } = useContext(Context)

    //we use ridx + cidx as a key, this is in board.js as well
    setCurrStateCache.current[ridx + " " + cidx] = setCurrState

    useEffect(() => {

    }, [currState])

    const getColor = () => {
        return currState
    }

    return (
        <div 
            className="square" 
            data-state={currState}
            data-ridx={ridx}
            data-cidx={cidx}
            style={{
                backgroundColor: getColor()
            }}
        />
    )
}

export default Square