import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { withRouter } from "react-router-dom";

import {
    formLayout,
    tailLayout,
    localStorageVariableName,
    route,
} from "../../common/AppConfig.js";
import styles from "../../style/LoginStyle.module.css";

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
};

const Login = props => {
    const [isRegistration, setIsRegistration] = useState(true)

    useEffect(() => {
        // If we have even one user we will show login
        if (localStorage.getItem(localStorageVariableName.user) !== null) {
            setIsRegistration(false)
        }
    }, [])

    const onFinish = (values) => {
        if (isRegistration) {
            // In case of first user
            if (localStorage.getItem(localStorageVariableName.user) === null) {
                localStorage.setItem(localStorageVariableName.user, JSON.stringify([values]));
            }
            // If we already have users
            else {
                let existingUser = localStorage.getItem(localStorageVariableName.user)
                existingUser = JSON.parse(existingUser)
                let allUser = existingUser.concat(values)
                localStorage.setItem(localStorageVariableName.user, JSON.stringify(allUser));
            }
            props.history.push({
                pathname: route.home
            })
        }
        // In case of login
        else {
            let userData = localStorage.getItem(localStorageVariableName.user)
            userData = JSON.parse(userData)
            // If user is found redirect to home screen
            userData.map(user => {
                if (user.username === values.username) {
                    props.history.push({
                        pathname: route.home
                    })
                }
            })
            // if not show registration
            setIsRegistration(true)
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <div>
            <div className={styles.loginHeader}>Welcome</div>
            {
                isRegistration &&
                <div>Please register your account</div>
            }
            
            <Form
                {...formLayout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label='username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            type: 'string',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='password'
                    name='password'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />

                </Form.Item>

                {isRegistration &&
                    <>
                        <Form.Item
                            label='name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    type: 'string',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='email'
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='phone'
                            name='phone'
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                }
                            ]}
                        >
                            <InputNumber style={{ width: 230 }} />
                        </Form.Item>
                    </>
                }


                <Form.Item {...tailLayout}>
                    <Button
                        type='default'
                        className={styles.button}
                        style={{ marginTop: 15 }}
                        htmlType='submit'
                    >
                        {isRegistration ? "Register" : "Login"}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
}

export default withRouter(Login);

