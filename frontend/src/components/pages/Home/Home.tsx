import React from "react";
import Counter from "@redux/counter/Counter";

export const Home: React.FC = () => {
    return (
        <div>
            <h1>Strona główna</h1>
            <Counter/>
        </div>
    );
};
