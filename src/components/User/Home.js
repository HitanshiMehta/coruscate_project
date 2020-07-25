import React, { useContext, useState, useEffect } from 'react';
import { route, themeContext, localStorageVariableName } from '../../common/AppConfig'
import { Table } from 'antd';
import styles from '../../style/HomeStyle.module.css'
import { ThemeContext } from '../../context/ThemeContext'

const Home = (props) => {
    const [user, setUser] = useState()

    const columns = [
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username',
        },
    ];


    useEffect(() => {
        let existingUser = localStorage.getItem(localStorageVariableName.user)
        existingUser = JSON.parse(existingUser)
        setUser(existingUser)
    }, [])

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const { toggleTheme } = useContext(ThemeContext);

    const redirectToLogin = () => {
        props.history.push({
            pathname: route.loginIndex,
        })
    }
    return (
        <div
            className={styles.containerClass}
            style={{ background: theme.bg, color: theme.textColor }}
        >
            <Table dataSource={user} columns={columns}/><br />
            <button onClick={redirectToLogin}>Go to login</button>
            <button
                onClick={toggleTheme}
                style={theme.bg === themeContext.lightBg ?
                    { backgroundColor: themeContext.darkBg, color: themeContext.darkTextColor } :
                    { backgroundColor: themeContext.lightBg, color: themeContext.lightTextColor }}>
                {theme.ui === themeContext.lightUi ? "Dark Mode" : "Light Mode"}
            </button>
        </div>);
}


export default Home;