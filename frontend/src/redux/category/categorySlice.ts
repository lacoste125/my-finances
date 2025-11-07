import {createSlice} from "@reduxjs/toolkit";
import {CategoryType} from "@objects/payment.type";
import {getAllCategories} from "@redux/category/category.thunk";

interface CategoryState {
    categories: CategoryType[];
}

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});

export default categorySlice.reducer;