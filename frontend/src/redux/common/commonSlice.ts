import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

export enum MessageType {
    INFO,
    ERROR,
    SUCCESS,
}

export interface Message {
    _id: string,
    message: string,
    type: MessageType,
}

interface CommonState {
    loading: boolean;
    messages: Message[];
}

const initialState: CommonState = {
    loading: false,
    messages: [],
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
            state.messages = [
                ...state.messages,
                {
                    _id: uuid(),
                    message: action.payload,
                    type: MessageType.SUCCESS,
                }
            ];
        },
        addError: (state, action: PayloadAction<string>) => {
            state.messages = [
                ...state.messages,
                {
                    _id: uuid(),
                    message: action.payload,
                    type: MessageType.ERROR,
                }
            ];
        },
        closeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter(m => m._id !== action.payload);
        },
    },
});

export const {
    startLoading,
    finishLoading,
    addSuccess,
    addError,
    closeMessage,
} = commonSlice.actions;

export default commonSlice.reducer;
