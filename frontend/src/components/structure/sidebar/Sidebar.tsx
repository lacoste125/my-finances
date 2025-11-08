import React from "react";
import {Drawer, List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "./Sidebar.module.css";
import {Page, Pages} from "@objects/pages.type";

const Sidebar: React.FC<{
    open: boolean;
    onClose: () => void;
}> = ({
    open,
    onClose,
}) => {
    if (!open) return null;

    return (
        <Drawer open={open} onClose={onClose}>
            <div className={styles.sidebar}>
                <List>
                    {
                        Pages.map(
                            (p: Page) => {
                                return (
                                    <ListItem
                                        key={`ListItem-${p.name}`}
                                        className={styles.listItem}
                                        component={Link}
                                        to={p.path}
                                        onClick={onClose}
                                    >
                                        <ListItemText primary={p.name}/>
                                    </ListItem>
                                );
                            }
                        )
                    }
                </List>
            </div>
        </Drawer>
    );
};

export default Sidebar;
