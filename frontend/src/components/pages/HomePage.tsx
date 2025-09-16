import Stack from "react-bootstrap/Stack";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import work_in_progress from "../../media/wip.png";

const HomePage = () => {
    return (
        <div>
            <Stack id="year">
                <img width={"570"} height={"500"} src={work_in_progress} alt="work in progress alt text"/>
            </Stack>
        </div>
    );
};

export default HomePage;