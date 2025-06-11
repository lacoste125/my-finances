import { createStore, combineReducers } from 'redux'
import {appReducer} from "./appReducer";


const rootReducer = combineReducers({
    counter: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
export type AppDispatch = typeof store.dispatch