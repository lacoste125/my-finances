import MainLayout from "./components/structure/layout/MainLayout";
import {useEffect} from "react";
import {AppRouter} from "./components/structure/Router/AppRouter";
import {getAllYearNumbers} from "@redux/year/year.thunk";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {UiBlocker} from "./components/structure/loading/UiBlocker";
import {SnackProvider} from "./components/structure/snackbar/SnackProvider";

function App() {
    const dispatch = useAppDispatch();
    const yearNumbers = useAppSelector(state => state.yearReducer.yearNumbers);

    useEffect(() => {
        if (!yearNumbers.length) {
            dispatch(getAllYearNumbers());
        }
    }, []);

    return (
        <>
            <UiBlocker/>
            <SnackProvider/>
            <MainLayout>
                <AppRouter/>
            </MainLayout>
        </>
    );
}

export default App;
