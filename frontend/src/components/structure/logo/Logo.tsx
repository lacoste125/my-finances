import {Typography} from "@mui/material";
import styles from "./Logo.module.css";
import React from "react";
import app_logo from "@img/logo_transparent_2.png";

export const Logo: React.FC = () => {
    return (
        <Typography variant="h6" >
            <a href="http://localhost:3000/" target="_blank">
                <img src={app_logo} alt="App logo" height="40px" className={styles.logo}/>
            </a>
        </Typography>
    );
};