import MainLayout from "./components/structure/layout/MainLayout";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@app/store";
import {getAllYearNumbers, PaymentsState} from "@redux/payments/paymentsSlice";
import {AppRouter} from "./components/structure/Router/AppRouter";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {yearNumbers} = useSelector((state: RootState): PaymentsState => state.payments);

    useEffect(() => {
        if (!yearNumbers.length) {
            dispatch(getAllYearNumbers());
        }
    }, [dispatch]);

    return (
        <MainLayout>
            <AppRouter/>
        </MainLayout>
    );
}

export default App;
