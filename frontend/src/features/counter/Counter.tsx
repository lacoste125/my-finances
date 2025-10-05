import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {decrement, increment, incrementByAmount} from "./counterSlice";
import {Button} from "@mui/material";

const Counter: React.FC = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

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
