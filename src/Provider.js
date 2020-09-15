import React , { createContext, useState, useRef } from 'react'
import { BOARD, INITIAL_COLOR } from "./constants"

const Context = createContext();

const Provider = ({children}) => {
    const [isPathExist, setIsPathExist]   = useState(true)
    const [isVisualized, setIsVisualized] = useState(false)
    
    /* 
    this holds the state hooks from Square.js
    */
    const setCurrStateCache = useRef({})

    //board data
    const board = useRef(BOARD)
    const begin = useRef({x: 1, y: 1})
    const end   = useRef({x: 5, y: 9})

    //methods
    const updateSquare = (ridx, cidx, toState = INITIAL_COLOR) => {
        board.current[ridx][cidx] = toState
        const setCurrState = setCurrStateCache.current[ridx + " " + cidx]

        setCurrState(toState)
    }

    return (
        <Context.Provider value = {{
            //states
            isPathExist,
            isVisualized,
            
            //methods
            setIsPathExist,
            setIsVisualized,
            updateSquare,

            //ref
            setCurrStateCache,
            board,
            begin,
            end
        }}
        >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }