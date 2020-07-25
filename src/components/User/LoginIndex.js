import React from "react";
import styles from "../../style/LoginStyle.module.css";
import { loginIndex } from "../../common/AppConfig.js";
import Login from "./Login";
import { Card } from "antd";

const gridStyle = {
  width: "50%",
  height: "510px",
  padding: 0,
};

const LoginIndex = () => {
  return (<div className={styles.containerClass}>
    <center>
      <div className="site-card-border-less-wrapper">
        <Card
          style={{ maxWidth: 1000, height: "auto", top: 70, width: "100%" }}
        >
          <Card.Grid hoverable={true} style={gridStyle}>
            <img
              src={loginIndex.loginImagePath}
              alt={loginIndex.loginImagePath}
              className={styles.loginImg}
            />
          </Card.Grid>
          <Card.Grid hoverable={true} style={gridStyle}>
            <Login/>
          </Card.Grid>
        </Card>
      </div>
    </center>
  </div>
  );
}

export default LoginIndex;
