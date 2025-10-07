import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import paymentsReducer from "../redux/payments/paymentsSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        payments: paymentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
