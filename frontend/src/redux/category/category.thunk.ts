import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleApiCallWithLoading} from "@app/dispatch.helper";
import {AppDispatch} from "@app/store";
import {apiClient} from "@api/apiClient";
import {GET_ALL_CATEGORIES_API_PATH} from "@utils/api.actions";
import {CategoryType} from "@objects/payment.type";

export const getAllCategories = createAsyncThunk<CategoryType[]>(
    "category/getAllCategories",
    async (_, {dispatch}) => {
        return await handleApiCallWithLoading<CategoryType[]>(
            dispatch as AppDispatch,
            () => apiClient<CategoryType[]>({endpoint: GET_ALL_CATEGORIES_API_PATH})
        );
    }
);