import React from "react";
import {decrement, increment, incrementByAmount} from "./counterSlice";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@app/hooks";

const Counter: React.FC = () => {
    const count = useAppSelector(state => state.counterReducer.value);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h2>Licznik: {count}</h2>
            <Button variant="contained" onClick={() => dispatch(increment())}>
                +1
            </Button>
            <Button variant="contained" onClick={() => dispatch(decrement())}>
                -1
            </Button>
            <Button variant="contained" onClick={() => dispatch(incrementByAmount(5))}>
                +5
            </Button>
        </div>
    );
};

export default Counter;
