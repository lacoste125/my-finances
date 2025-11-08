import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
    reducers: {
        addCategory: (state, action: PayloadAction<CategoryType>) => {
            state.categories.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});

export const {addCategory} = categorySlice.actions;
export default categorySlice.reducer;