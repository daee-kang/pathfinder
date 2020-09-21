import React , { createContext, useState, useRef } from 'react'
import { BOARD, COL, INITIAL_COLOR, ROW, START_COLOR, TARGET_COLOR } from "./constants"

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
    const end   = useRef({x: 18, y: 18})
    const pathFinder = useRef()

    //methods
    const updateSquare = (ridx, cidx, toState = INITIAL_COLOR, delay) => {
        console.log(toState)
        board.current[ridx][cidx] = toState
        const setCurrState = setCurrStateCache.current[ridx + " " + cidx]

        if(delay) {
            setTimeout(() => {
                setCurrState(toState)
            }, delay)
        } else {
            setCurrState(toState)
        }
    }

    const dragSquare = (ridx, cidx, toState) => {

        if( toState == START_COLOR ) {
            if( ridx == begin.current.x && cidx == begin.current.y ) return
            let prex = begin.current.x
            let prey = begin.current.y

            begin.current = {x: ridx, y: cidx}

            updateSquare(prex, prey)
            updateSquare(begin.current.x, begin.current.y, START_COLOR)
        } else if( toState == TARGET_COLOR ) {
            if( ridx == end.current.x && cidx == end.current.y ) return
            let prex = end.current.x
            let prey = end.current.y

            end.current = {x: ridx, y: cidx}

            updateSquare(prex, prey)
            updateSquare(end.current.x, end.current.y, TARGET_COLOR)
        }
    }

    const clearBoard = () => {
        for(let i = 0; i < COL; i++){
            for(let j = 0; j < ROW; j++) {
                updateSquare(i, j)
            }
        }
        setIsVisualized(false)
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
            dragSquare,
            clearBoard,

            //ref
            setCurrStateCache,
            board,
            begin,
            end,
            pathFinder
        }}
        >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }