import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "@app/store";
import {apiClient, apiClientWithResponse} from "@api/apiClient";
import {
    ADD_PAYMENT_API_PATH,
    CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH,
    CREATE_NEXT_YEAR_API_PATH,
    DISABLE_PAYMENT_API_PATH,
    ENABLE_PAYMENT_API_PATH,
    GET_YEAR_BY_YEAR_NUMBER_API_PATH,
    YEARS_API_PATH
} from "@utils/api.actions";
import {DisabledPayment, Payment, Year, YearCategory} from "@objects/payment.type";
import {handleApiCallWithLoading} from "@app/dispatch.helper";
import {
    AddPaymentRequestBody,
    CreateCategoryAndAddToYearRequestBody,
    TogglePaymentRequestBody
} from "@objects/request.type";
import {addCategory} from "@redux/category/categorySlice";

export const getAllYearNumbers = createAsyncThunk<number[]>(
    "year/getAllYearNumbers",
    async (_, {dispatch}) => {
        return await handleApiCallWithLoading<number[]>(
            dispatch as AppDispatch,
            () => apiClient<number[]>({endpoint: YEARS_API_PATH})
        );
    }
);

export const getYearByYearNumber = createAsyncThunk<Year, number>(
    "year/getYearByYearNumber",
    async (yearNumber: number, {dispatch}) => {
        return await handleApiCallWithLoading<Year>(
            dispatch as AppDispatch,
            () => apiClient<Year>({
                endpoint: GET_YEAR_BY_YEAR_NUMBER_API_PATH,
                params: {yearNumber},
            })
        );
    }
);

export const addPayment = createAsyncThunk<Payment, AddPaymentRequestBody>(
    "year/addPayment",
    async (body: AddPaymentRequestBody, {dispatch}) => {
        return await handleApiCallWithLoading<Payment>(
            dispatch as AppDispatch,
            () => apiClient({
                method: "POST",
                endpoint: ADD_PAYMENT_API_PATH,
                body: body,
            })
        );
    }
);

export const enablePayment = createAsyncThunk<DisabledPayment, TogglePaymentRequestBody>(
    "year/enablePayment",
    async (body: TogglePaymentRequestBody, {dispatch}) => {
        return await handleApiCallWithLoading<DisabledPayment>(
            dispatch as AppDispatch,
            () => apiClient({
                endpoint: ENABLE_PAYMENT_API_PATH,
                method: "POST",
                body: body,
            })
        );
    }
);

export const disablePayment = createAsyncThunk<DisabledPayment, TogglePaymentRequestBody>(
    "year/disablePayment",
    async (body: TogglePaymentRequestBody, {dispatch}) => {
        return await handleApiCallWithLoading<DisabledPayment>(
            dispatch as AppDispatch,
            () => apiClient({
                endpoint: DISABLE_PAYMENT_API_PATH,
                method: "POST",
                body: body,
            })
        );
    }
);

export const addNewYear = createAsyncThunk<Year>(
    "year/addNewYear",
    async (_, {dispatch}) => {
        return await handleApiCallWithLoading<Year>(
            dispatch as AppDispatch,
            () => apiClient({
                method: "POST",
                endpoint: CREATE_NEXT_YEAR_API_PATH,
                body: {},
            })
        );
    }
);

export const createNewCategoryAndAddToYear = createAsyncThunk<YearCategory, CreateCategoryAndAddToYearRequestBody>(
    "year/createNewCategoryAndAddToYear",
    async (body: CreateCategoryAndAddToYearRequestBody, {dispatch}) => {
        const response = await handleApiCallWithLoading(
            dispatch as AppDispatch,
            () => apiClientWithResponse({
                endpoint: CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH,
                method: "PUT",
                body: body,
            })
        );

        const data = response.data as YearCategory;

        if (response.status === 201) {
            dispatch(addCategory(data.categoryType));
        }

        return data;
    }
);

