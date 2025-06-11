import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../store/'
import {useAppDispatchers} from "../store/dispatchers";

const Counter: React.FC = () => {
    const count: number = useSelector((state: RootState) => state.counter.count)
    const {increment, decrement} = useAppDispatchers()

    return <div>
        <p>Count: {count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </div>
}

export default Counter
