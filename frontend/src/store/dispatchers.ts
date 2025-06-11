import {allActions} from "./appActions";
import {AppDispatch} from "./index";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";

export const useAppDispatchers = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(allActions, dispatch)
}