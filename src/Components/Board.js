import React, { useContext, useState, useRef } from 'react'
import { Context } from '../Provider'
import { BOARD, INITIAL_COLOR, WALL_COLOR, PATH_COLOR, START_COLOR, TARGET_COLOR } from '../constants'
import Square from './Square'

import './Styles/Board.scss'

const Board = () => {
    const context = useContext(Context)
    const { updateSquare, dragSquare, isDrawing, begin, end } = context

    let cache = {}
    
    //states
    const [clicking, setClicking] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [dragState, setDragState] = useState()

    const onMouseDown = (e) => {
        if(isDrawing == true) return;

        if(e.target.dataset.state == START_COLOR || e.target.dataset.state == TARGET_COLOR) {
            setDragState(e.target.dataset.state)
            setDragging(true)
        } else {
            setClicking(true)
        }
    }

    const onMouseUp = (e) => {
        if(isDrawing == true) return;
        cache = {}

        setDragging(false)
        setClicking(false)
    }

    const onMouseMove = (e) => {
        if(isDrawing == true) return;
        if(clicking) {
            changeColor(e)
        } else if (dragging) {
            moveColor(e)
        }
    }

    const onClick = (e) => {
        if(isDrawing == true) return;
        toggleColor(e)
    }

    const toggleColor = (e) => {
        if(isDrawing == true) return;

        let ridx = e.target.dataset.ridx
        let cidx = e.target.dataset.cidx
        
        if(ridx === undefined) return
        if(cidx === undefined) return

        let state = BOARD[ridx][cidx]
        console.log(state)
        if(state == WALL_COLOR) {
            updateSquare(Number(ridx), Number(cidx))
        } else if (state == INITIAL_COLOR) {
            updateSquare(Number(ridx), Number(cidx), WALL_COLOR)
        }
    }

    const changeColor = (e) => {
        if(isDrawing == true) return;

        let ridx = e.target.dataset.ridx
        let cidx = e.target.dataset.cidx
        
        if(ridx === undefined) return
        if(cidx === undefined) return

        if(cache[ridx+ " " + cidx] == true) return

        updateSquare(Number(ridx), Number(cidx), WALL_COLOR)
        cache[ridx + " " + cidx] = true

    }

    const moveColor = (e) => {
        if(isDrawing == true) return;
        
        let ridx = e.target.dataset.ridx
        let cidx = e.target.dataset.cidx
        
        if(ridx === undefined) return
        if(cidx === undefined) return

        dragSquare(Number(ridx), Number(cidx), dragState)
    }

    return (
        <div 
            className = "board"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onClick={onClick}
            onTouchMove={onMouseMove}
            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
        >
            {BOARD.map((row, i) => (
                <div className="board-row" key={i}>
                    {row.map((col, j) => (
                        <Square ridx={i} cidx={j} key={i + " " + j}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board