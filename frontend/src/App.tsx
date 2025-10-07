import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/structure/layout/MainLayout";
import Home from "./components/pages/Home/Home";
import Settings from "./components/pages/Settings/Settings";
import About from "./components/pages/About/About";
import {Payments} from "./components/pages/Payments/Payments";
import {useEffect, useState} from "react";
import {GET, YEARS} from "./utils/api.actions";

function App() {
    const [yearNumbers, setYearNumbers] = useState<number[]>([]);

    useEffect(() => {
        if (!yearNumbers.length) {
            GET(setYearNumbers, YEARS).then();
        }
    }, [yearNumbers]);

    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/about" element={<About/>}/>
                <Route
                    path="/payments"
                    element={
                        <Payments yearNumbers={yearNumbers}/>
                    }
                />
            </Routes>
        </MainLayout>
    );
}

export default App;
