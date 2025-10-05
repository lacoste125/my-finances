import React from "react";
import {Drawer, List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "../styles/Sidebar.module.css";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({open, onClose}) => {
    return (
        <Drawer open={open} onClose={onClose}>
            <div className={styles.sidebar}>
                <List>
                    <ListItem classes={{root: styles.listItem}} component={Link} to="/" onClick={onClose}>
                        <ListItemText primary="Strona główna"/>
                    </ListItem>
                    <ListItem className={styles.listItem} component={Link} to="/payments" onClick={onClose}>
                        <ListItemText primary="Payments"/>
                    </ListItem>
                    <ListItem className={styles.listItem} component={Link} to="/settings" onClick={onClose}>
                        <ListItemText primary="Ustawienia"/>
                    </ListItem>
                    <ListItem className={styles.listItem} component={Link} to="/about" onClick={onClose}>
                        <ListItemText primary="O aplikacji"/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default Sidebar;
