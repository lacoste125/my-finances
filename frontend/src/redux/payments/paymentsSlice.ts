import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Year} from "../../objects/payment.type";
import {GET_YEAR_BY_YEAR_NUMBER_API_PATH} from "../../utils/api.actions";

// ✅ API helpers
const BASE_API_PATH = (path: string) => `http://localhost:8181/api/${path}`;

const fetchJson = async <T>(path: string): Promise<T> => {
    const response = await fetch(BASE_API_PATH(path));
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
};


export const getAllYearNumbers = createAsyncThunk<number[]>(
    "payments/getAllYearNumbers",
    async () => fetchJson<number[]>("years")
);

export const getYearByYearNumber = createAsyncThunk<Year, number>(
    "payments/getYearByYearNumber",
    async (yearNumber) =>
        fetchJson<Year>(GET_YEAR_BY_YEAR_NUMBER_API_PATH(yearNumber))
);

export interface PaymentsState {
    yearNumbers: number[];
    year?: Year;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentsState = {
    yearNumbers: [],
    year: undefined,
    loading: false,
    error: null,
};

const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // helper for DRY loading state
        const startLoading = (state: PaymentsState) => {
            state.loading = true;
            state.error = null;
        };

        const stopWithError = (state: PaymentsState, message?: string) => {
            state.loading = false;
            state.error = message || "Unexpected error occurred";
        };

        builder
            // getAllYearNumbers
            .addCase(getAllYearNumbers.pending, startLoading)
            .addCase(
                getAllYearNumbers.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.loading = false;
                    state.yearNumbers = action.payload;
                }
            )
            .addCase(getAllYearNumbers.rejected, (state, action) =>
                stopWithError(state, action.error.message)
            )

            // getYearByYearNumber
            .addCase(getYearByYearNumber.pending, startLoading)
            .addCase(
                getYearByYearNumber.fulfilled,
                (state, action: PayloadAction<Year>) => {
                    state.loading = false;
                    state.year = action.payload;
                }
            )
            .addCase(getYearByYearNumber.rejected, (state, action) =>
                stopWithError(state, action.error.message)
            );
    },
});

export default paymentsSlice.reducer;
