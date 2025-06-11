export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

interface IncrementAction {
    type: typeof INCREMENT
}

interface DecrementAction {
    type: typeof DECREMENT
}

export type CounterActionTypes = IncrementAction | DecrementAction

export const increment = (): CounterActionTypes => ({
    type: INCREMENT,
})

export const decrement = (): CounterActionTypes => ({
    type: DECREMENT,
})

export const allActions = {
    increment,
    decrement,
    // add more as needed
}