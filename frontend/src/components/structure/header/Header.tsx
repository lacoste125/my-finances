import React from "react";
import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import {LoadingProvider} from "../loading/LoadingProvider";

const Header: React.FC<{
    onMenuClick: () => void;
}> = ({
    onMenuClick,
}) => {
    return (
        <AppBar position="static" className={styles.header}>
            <Toolbar className={styles.toolbar}>
                <div className={styles.leftSection}>
                    <IconButton edge="start" color="inherit" onClick={onMenuClick}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={styles.logo}>
                        LOGO
                    </Typography>
                </div>
                <div className={styles.rightSection}>
                    <Avatar alt="User Avatar" src="/user.png"/>
                </div>
            </Toolbar>
            <LoadingProvider/>
        </AppBar>
    );
};

export default Header;
