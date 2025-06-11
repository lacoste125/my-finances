import { INCREMENT, DECREMENT, CounterActionTypes } from './appActions'

export interface CounterState {
    count: number
}

const initialState: CounterState = {
    count: 0
}

export const appReducer = (
    state = initialState,
    action: CounterActionTypes
): CounterState => {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 }
        case DECREMENT:
            return { count: state.count - 1 }
        default:
            return state
    }
}
