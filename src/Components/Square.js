import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../Provider'
import './Square.scss'

import {
    INITIAL_COLOR,
    VISITED_COLOR,
    PATH_COLOR,
    WALL_COLOR,
    TARGET_COLOR,
    START_COLOR
} from '../constants'

const Square = ({ridx, cidx}) => {
    const [currState, setCurrState] = useState(INITIAL_COLOR)
    const { begin, end, setIsVisualized, setCurrStateCache } = useContext(Context)

    //we use ridx + cidx as a key, this is in board.js as well
    setCurrStateCache.current[ridx + " " + cidx] = setCurrState

    //onload
    useEffect(() => {
        if( ridx == begin.current.x && cidx == begin.current.y ) {
            setCurrState(START_COLOR)
        } else if ( ridx == end.current.x && cidx == end.current.y) {
            setCurrState(TARGET_COLOR)
        }
    })

    return (
        <div 
            className="square" 
            data-state={currState}
            data-ridx={ridx}
            data-cidx={cidx}
            style={{
                backgroundColor: currState
            }}
        />
    )
}

export default Square