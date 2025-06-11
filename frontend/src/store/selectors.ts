import {useSelector} from "react-redux";
import {RootState} from "./index";

export const useCount = (): number => {
    return useSelector((state: RootState) => state.counter.count)
}