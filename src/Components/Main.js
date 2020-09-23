import React from "react"
import Board from "./Board"
import Header from "./Header"
import './Styles/Main.scss'

const Main = () => {
    return (
        <div className="main">
            <Header />
            <div className="aligner">
                <Board />
            </div>
        </div>
    )
}

export default Main