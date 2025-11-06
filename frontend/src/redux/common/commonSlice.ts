import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonState {
    loading: boolean;
    success: string | null;
    error: string | null;
}

const initialState: CommonState = {
    loading: false,
    success: null,
    error: null,
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        addSuccess: (state, action: PayloadAction<string>) => {
            state.success = action.payload;
        },
        closeSuccess: (state) => {
            state.success = null;
        },
        addError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        closeError: (state) => {
            state.error = null;
        },
    },
});

export const {
    startLoading,
    finishLoading,
    addSuccess,
    closeSuccess,
    addError,
    closeError,
} = commonSlice.actions;

export default commonSlice.reducer;
