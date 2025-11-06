import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "@app/store";
import {apiClient} from "@api/apiClient";
import {
    ADD_PAYMENT_API_PATH,
    DISABLE_PAYMENT_API_PATH,
    ENABLE_PAYMENT_API_PATH,
    GET_YEAR_BY_YEAR_NUMBER_API_PATH,
    YEARS_API_PATH
} from "@utils/api.actions";
import {DisabledPayment, Payment, Year} from "@objects/payment.type";
import {handleApiCallWithLoading} from "@app/dispatch.helper";
import {AddPaymentRequestBody, TogglePaymentRequestBody} from "@objects/request.type";

export const getAllYearNumbers = createAsyncThunk<number[]>(
    "payments/getAllYearNumbers",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            return await handleApiCallWithLoading<number[]>(
                dispatch as AppDispatch,
                () => apiClient<number[]>({endpoint: YEARS_API_PATH})
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getYearByYearNumber = createAsyncThunk<Year, number>(
    "payments/getYearByYearNumber",
    async (yearNumber: number, {dispatch, rejectWithValue}) => {
        try {
            return await handleApiCallWithLoading<Year>(
                dispatch as AppDispatch,
                () => apiClient<Year>({
                    endpoint: GET_YEAR_BY_YEAR_NUMBER_API_PATH,
                    params: {yearNumber},
                })
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addPayment = createAsyncThunk<Payment, AddPaymentRequestBody>(
    "payments/addPayment",
    async (body: AddPaymentRequestBody, {dispatch, rejectWithValue}) => {
        try {
            return await handleApiCallWithLoading<Payment>(
                dispatch as AppDispatch,
                () => apiClient({
                    method: "POST",
                    endpoint: ADD_PAYMENT_API_PATH,
                    body: body,
                })
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const enablePayment = createAsyncThunk<DisabledPayment, TogglePaymentRequestBody>(
    "payments/enablePayment",
    async (body: TogglePaymentRequestBody, {dispatch, rejectWithValue}) => {
        try {
            return await handleApiCallWithLoading<DisabledPayment>(
                dispatch as AppDispatch,
                () => apiClient({
                    endpoint: ENABLE_PAYMENT_API_PATH,
                    method: "POST",
                    body: body,
                })
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const disablePayment = createAsyncThunk<DisabledPayment, TogglePaymentRequestBody>(
    "payments/disablePayment",
    async (body: TogglePaymentRequestBody, {dispatch, rejectWithValue}) => {
        try {
            return await handleApiCallWithLoading<DisabledPayment>(
                dispatch as AppDispatch,
                () => apiClient({
                    endpoint: DISABLE_PAYMENT_API_PATH,
                    method: "POST",
                    body: body,
                })
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
