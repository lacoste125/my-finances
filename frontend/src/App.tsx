import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import {Payments} from "./pages/Payments";
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
