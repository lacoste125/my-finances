import MainLayout from "./components/structure/layout/MainLayout";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@app/store";
import {AppRouter} from "./components/structure/Router/AppRouter";
import {getAllYearNumbers} from "@redux/payments/payment.thunk";
import {useAppSelector} from "@app/hooks";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const yearNumbers = useAppSelector(state => state.payments.yearNumbers);

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
