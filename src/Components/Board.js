import React, { useContext, useState, useRef } from 'react'
import { Context } from '../Provider'
import { BOARD, INITIAL_COLOR, WALL_COLOR, PATH_COLOR, START_COLOR, TARGET_COLOR } from '../constants'
import Square from './Square'

import './Board.css'

const Board = () => {
    const context = useContext(Context)
    const { updateSquare, dragSquare, begin, end } = context

    //states
    const [clicking, setClicking] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [dragState, setDragState] = useState()

    const onMouseDown = (e) => {
        if(e.target.dataset.state == START_COLOR || e.target.dataset.state == TARGET_COLOR) {
            setDragState(e.target.dataset.state)
            setDragging(true)
        } else {
            console.log("clicking")
            setClicking(true)
        }
    }

    const onMouseUp = (e) => {
        setDragging(false)
        setClicking(false)
    }

    const onMouseMove = (e) => {
        if(clicking) {
            console.log("clicking")
            changeColor(e)
        } else if (dragging) {
            console.log("dragging")
            moveColor(e)
        }
    }

    const onClick = (e) => {
        changeColor(e)
    }

    const changeColor = (e) => {
        let ridx = e.target.dataset.ridx
        let cidx = e.target.dataset.cidx
        
        if(ridx === undefined) return
        if(cidx === undefined) return

        updateSquare(Number(ridx), Number(cidx), WALL_COLOR)
    }

    const moveColor = (e) => {
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