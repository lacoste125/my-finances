import React from "react";
import styles from "./Footer.module.css";
import {STATIC_TEXT} from "../../../objects/static_text";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>{STATIC_TEXT.COPYRIGHT_BY_MARIUSZ_FOOTER(new Date().getFullYear())}</p>
        </footer>
    );
};

export default Footer;
