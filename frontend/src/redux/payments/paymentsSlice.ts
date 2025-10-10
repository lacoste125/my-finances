import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Year} from "@objects/payment.type";
import {GET_YEAR_BY_YEAR_NUMBER_API_PATH, YEARS_API_PATH} from "@utils/api.actions";
import {apiClient} from "@api/apiClient";

export const getAllYearNumbers = createAsyncThunk<number[]>(
    "payments/getAllYearNumbers",
    async () => apiClient<number[]>({endpoint: YEARS_API_PATH})
);

export const getYearByYearNumber = createAsyncThunk<Year, number>(
    "payments/getYearByYearNumber",
    async (yearNumber) => apiClient<Year>({
        endpoint: GET_YEAR_BY_YEAR_NUMBER_API_PATH,
        params: {yearNumber: yearNumber}
    })
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
