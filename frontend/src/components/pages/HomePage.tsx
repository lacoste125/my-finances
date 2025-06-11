import Stack from "react-bootstrap/Stack";
import * as React from "react";
import work_in_progress from '../../media/wip.png';
import Counter from "../Counter";

export const HomePage = () => {
    return <div>
        <Stack id="year">
            <img width={'570'} height={'500'} src={work_in_progress} alt="work in progress alt text"/>
            <Counter/>
        </Stack>
    </div>
}

export default HomePage;