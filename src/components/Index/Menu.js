import React from 'react'
import { route } from '../../common/AppConfig'
import styles from '../../style/MenuStyle.module.css'
import { withRouter } from "react-router-dom";

const Menu = (props) => {
    const redirectToUser = () => {
        props.history.push({
            pathname: route.loginIndex
        })
    }
    const redirectToPuzzle = () => {
        props.history.push({
            pathname: route.userForm
        })
    }
    return (
        <center className={styles.containerClass}>
            <button onClick={redirectToUser}>
                User
            </button>
            <button onClick={redirectToPuzzle}>
                Puzzle
            </button>
        </center>
    )
}

export default withRouter(Menu)
