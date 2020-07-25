import React, { useState, useEffect } from 'react'
import { route, welcome } from '../../common/AppConfig'
import { withRouter } from "react-router-dom";
import styles from '../../style/WelcomeStyle.module.css'
import { Redirect } from 'react-router-dom'

const Welcome = () => {
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setRedirect(true)
        }, 2000)
    }, [])
    if (redirect) {
        return (
            <Redirect to={route.menu} />
        )
    } else {
        return (
            <img
                src={welcome.indexImagePath}
                alt={welcome.indexImageAlt}
                className={styles.indexImg}
            />
        )
    }
}

export default withRouter(Welcome)
