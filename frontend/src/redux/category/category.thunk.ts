import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleApiCallWithLoading} from "@app/dispatch.helper";
import {AppDispatch} from "@app/store";
import {apiClient} from "@api/apiClient";
import {CategoryType} from "@objects/payment.type";
import {CATEGORIES_API_PATH} from "@utils/api.actions";

export const getAllCategories = createAsyncThunk<CategoryType[]>(
    "category/getAllCategories",
    async (_, {dispatch}) => {
        return await handleApiCallWithLoading<CategoryType[]>(
            dispatch as AppDispatch,
            () => apiClient<CategoryType[]>({endpoint: CATEGORIES_API_PATH})
        );
    }
);