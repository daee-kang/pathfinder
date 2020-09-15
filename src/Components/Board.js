import React, { useContext, useState, useRef } from 'react'
import { Context } from '../Provider'
import { BOARD, INITIAL_COLOR, PATH_COLOR } from '../constants'
import Square from './Square'

const Board = () => {
    const context = useContext(Context)
    const { updateSquare } = context

    //states
    const [clicking, setClicking] = useState(false)

    const onMouseDown = (e) => {
        setClicking(true)
    }

    const onMouseUp = (e) => {
        setClicking(false)
    }

    const onMouseMove = (e) => {
        if(!clicking) return

        changeColor(e)
    }

    const onClick = (e) => {
        changeColor(e)
    }

    const changeColor = (e) => {
        if(e.target.dataset.ridx == undefined) return
        if(e.target.dataset.cidx == undefined) return

        const ridx = Number(e.target.dataset.ridx)
        const cidx = Number(e.target.dataset.cidx)

        updateSquare(ridx, cidx, PATH_COLOR)
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
                    <br />
                </div>
            ))}
        </div>
    )
}

export default Board