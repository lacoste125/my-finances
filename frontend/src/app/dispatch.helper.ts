import {AppDispatch} from "@app/store";
import {addError, addSuccess, finishLoading, startLoading} from "@redux/common/commonSlice";

export async function handleApiCallWithLoadingAndSuccess<T>(
    dispatch: AppDispatch,
    apiFunction: () => Promise<T>,
    successMessage: string,
    errorMessage: string = "Something went wrong",
): Promise<T> {
    try {
        dispatch(startLoading());

        const result = await apiFunction();

        dispatch(addSuccess(successMessage));

        return result;
    } catch (error: any) {
        dispatch(addError(errorMessage));

        throw error;
    } finally {
        dispatch(finishLoading());
    }
}

export async function handleApiCallWithLoading<T>(
    dispatch: AppDispatch,
    apiFunction: () => Promise<T>,
    errorMessage: string = "Something went wrong"
): Promise<T> {
    try {
        dispatch(startLoading());

        return await apiFunction();
    } catch (error: any) {
        dispatch(addError(errorMessage));

        throw error;
    } finally {
        dispatch(finishLoading());
    }
}

export async function handleApiCall<T>(
    dispatch: AppDispatch,
    apiFunction: () => Promise<T>,
    errorMessage: string = "Something went wrong"
): Promise<T> {
    try {
        return await apiFunction();
    } catch (error: any) {
        dispatch(addError(errorMessage));

        throw error;
    }
}