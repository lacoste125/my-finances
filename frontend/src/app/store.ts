import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import yearReducer from "@redux/year/yearSlice";
import commonReducer from "../redux/common/commonSlice";
import categoryReducer from "../redux/category/categorySlice";

export const store = configureStore({
    reducer: {
        commonReducer: commonReducer,
        counterReducer: counterReducer,
        yearReducer: yearReducer,
        categoryReducer: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
