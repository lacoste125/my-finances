import {createSlice} from "@reduxjs/toolkit";
import {DisabledPayment, Payment, Year} from "@objects/payment.type";
import {
    addNewYear,
    addPayment,
    disablePayment,
    enablePayment,
    getAllYearNumbers,
    getYearByYearNumber
} from "@redux/year/year.thunk";

interface YearState {
    yearNumbers: number[];
    year: Year | null;
}

const initialState: YearState = {
    yearNumbers: [],
    year: null,
};

const yearSlice = createSlice({
    name: "year",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllYearNumbers.fulfilled, (state, action) => {
                state.yearNumbers = action.payload;
            })
            .addCase(getYearByYearNumber.fulfilled, (state, action) => {
                state.year = action.payload;
            })
            .addCase(addNewYear.fulfilled, (state, action) => {
                state.yearNumbers.push(action.payload.name);
                state.year = action.payload;
            })
            .addCase(addPayment.fulfilled, (state, action) => {
                if (!state.year) return;

                const payment: Payment = action.payload;
                const yearCategory = state.year.categories.find(
                    yc => yc.id === payment.yearCategoryId
                );

                if (yearCategory) {
                    yearCategory.payments.push(payment);
                }
            })
            .addCase(enablePayment.fulfilled, (state, action) => {
                if (!state.year) return;
                const payloadDisabledPayment: DisabledPayment = action.payload;

                const yearCategory = state.year.categories.find(
                    yc => yc.id === payloadDisabledPayment.yearCategoryId
                );

                if (!yearCategory) return;

                const disabledPayment = yearCategory.disabledPayments.find(
                    dp => dp.id == payloadDisabledPayment.id
                );

                if (disabledPayment) {
                    disabledPayment.valid = false;
                } else {
                    yearCategory.disabledPayments.push(payloadDisabledPayment);
                }
            })
            .addCase(disablePayment.fulfilled, (state, action) => {
                if (!state.year) return;

                const payloadDisabledPayment: DisabledPayment = action.payload;

                const yearCategory = state.year.categories.find(
                    yc => yc.id === payloadDisabledPayment.yearCategoryId
                );

                if (!yearCategory) return;

                const disabledPayment = yearCategory.disabledPayments.find(
                    dp => dp.id == payloadDisabledPayment.id
                );

                if (disabledPayment) {
                    disabledPayment.valid = true;
                } else {
                    yearCategory.disabledPayments.push(payloadDisabledPayment);
                }
            });
    },
});

export default yearSlice.reducer;
