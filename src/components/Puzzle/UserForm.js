import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import {
    formLayout,
    tailLayout,
    route,
} from "../../common/AppConfig.js";
import styles from "../../style/LoginStyle.module.css";
let count = 0

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a validate number!',
    },
};

const UserForm = props => {
    const [players, setPlayers] = useState()
    const [coinCount, setCoinCount] = useState()
    const [coinValue, setCoinValue] = useState([])
    const [playerArray, setPlayerArray] = useState([])
    const [winner, setWinner] = useState()

    const onFinish = async (values) => {
        setPlayers(values.players)
        setCoinCount(values.coinCount)
        let coins = values.coinValues.split(",");
        setCoinValue(coins)
    };

    useEffect(() => {
        function declareWinner() {
            if (coinValue) {
                if (coinValue.length !== 0) {

                    let firstNumber = parseInt(coinValue[0], 10)
                    let lastNumber = parseInt(coinValue[coinValue.length - 1], 10)

                    // When first time we enter value for particular player
                    if (playerArray[count] === undefined) {
                        if (firstNumber > lastNumber) {
                            playerArray[count] = firstNumber
                            coinValue.shift(firstNumber)
                        } else {
                            playerArray[count] = lastNumber
                            coinValue.pop()
                        }
                        // In case of second time we will perfom addition of early value
                    } else {
                        let perviousResult = playerArray[count]
                        if (firstNumber > lastNumber) {
                            playerArray[count] = firstNumber + perviousResult
                            coinValue.shift(firstNumber)
                        } else {
                            playerArray[count] = lastNumber + perviousResult
                            coinValue.pop()
                        }
                    }
                    // Once selectio of number isover, we will give change to another player
                    // If we come to last player we will agin start loop from first player
                    // till coinvalue.length become 0
                    if (count + 1 >= players) {
                        count = 0
                    }
                    else {
                        count = count + 1
                    }
                    declareWinner()
                }
                else {
                    // Once game is complete we will find out user who has win game
                    let max = playerArray[0]
                    for (let i = 0; i < playerArray.length; i++) {
                        console.log(playerArray[i])
                        if (playerArray[i] > max) {
                            max = playerArray[i];
                        }
                    }
                    setWinner(max)
                }
            }
        }
        declareWinner()
    }, [coinValue])

    useEffect(() => {
        let users = new Array(players)
        setPlayerArray(users)
    }, [players])

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <div>
            <div className={styles.loginHeader}>Welcome</div>
            <Form
                {...formLayout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label='No Of Players'
                    name='players'
                    rules={[
                        {
                            required: true,
                            type: 'number',
                        },
                        {
                            validator(rule, value) {
                                if (value < 2) {
                                    return Promise.reject(`Please enter player count more than 1`);
                                }
                                else {
                                    return Promise.resolve();
                                }
                            },
                        }

                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label='No Of Coin Count'
                    name='coinCount'
                    rules={[
                        {
                            required: true,
                            type: 'number'
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value < getFieldValue('players')) {
                                    return Promise.reject(`Please enter coin count greater than players`);
                                }
                                else {
                                    return Promise.resolve();
                                }
                            },
                        }),
                    ]}
                >
                    <InputNumber />

                </Form.Item>
                <Form.Item
                    label='Coin Values'
                    name='coinValues'
                    rules={[
                        {
                            required: true,
                            type: 'string',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                let coins = value.split(",");
                                if (getFieldValue('coinCount') === coins.length) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(`Please enter ${getFieldValue('coinCount')} coins`);
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button
                        type='default'
                        className={styles.button}
                        style={{ marginTop: 15 }}
                        htmlType='submit'
                    >
                        Calcultate
                    </Button>
                </Form.Item>


            </Form>
            <div style={{
                fontSize: 40,
                color: "blue",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>{winner && `Winner of game get ${winner} point`}</div>
        </div >
    );
}

export default withRouter(UserForm);

