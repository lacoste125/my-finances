import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "../styles/MainLayout.module.css";

const MainLayout: React.FC<{
    children: React.ReactNode,
}> = ({
    children
}) => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.layout}>
            <Header onMenuClick={toggleDrawer}/>
            <Sidebar open={open} onClose={toggleDrawer}/>
            <main className={styles.content}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;
