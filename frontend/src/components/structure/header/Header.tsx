import React from "react";
import {AppBar, Avatar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import {LoadingProvider} from "../loading/LoadingProvider";
import {Logo} from "../logo/Logo";

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
                    <Logo/>
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
