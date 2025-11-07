import MainLayout from "./components/structure/layout/MainLayout";
import {useEffect} from "react";
import {AppRouter} from "./components/structure/Router/AppRouter";
import {getAllYearNumbers} from "@redux/year/year.thunk";
import {useAppDispatch, useAppSelector} from "@app/hooks";

function App() {
    const dispatch = useAppDispatch();
    const yearNumbers = useAppSelector(state => state.yearReducer.yearNumbers);

    useEffect(() => {
        if (!yearNumbers.length) {
            dispatch(getAllYearNumbers());
        }
    }, []);

    return (
        <MainLayout>
            <AppRouter/>
        </MainLayout>
    );
}

export default App;
