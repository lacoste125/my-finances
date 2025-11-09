import {AppDispatch} from "@app/store";
import {addError, addSuccess, finishLoading, startLoading} from "@redux/common/commonSlice";

interface LoadingState {
    loadingTimeout: NodeJS.Timeout | null;
    loadingStarted: boolean;
}

async function callApi(
    state: LoadingState,
    dispatch: AppDispatch,
    apiFunction: () => Promise<unknown>,
): Promise<unknown> {
    const delayedLoading = new Promise<void>((resolve) => {
        state.loadingTimeout = setTimeout(() => {
            dispatch(startLoading());
            state.loadingStarted = true;
            resolve();
        }, 200);
    });

    return await Promise.race([
        apiFunction(),
        delayedLoading.then(() => new Promise(() => {
        })),
    ]);
}

function close(
    state: LoadingState,
    dispatch: AppDispatch,
) {
    if (state.loadingTimeout) {
        clearTimeout(state.loadingTimeout);
    }

    if (state.loadingStarted) {
        dispatch(finishLoading());
    }
}

export async function handleApiCallWithLoadingAndSuccess<T>(
    dispatch: AppDispatch,
    apiFunction: () => Promise<T>,
    successMessage: string = "Operation completed successfully",
    errorMessage: string = "Something went wrong",
): Promise<T> {
    const loadingState: LoadingState = {
        loadingTimeout: null,
        loadingStarted: false,
    };

    try {
        const result = callApi(loadingState, dispatch, apiFunction);
        dispatch(addSuccess(successMessage));

        return result as T;
    } catch (error: any) {
        dispatch(addError(errorMessage));
        throw error;
    } finally {
        close(loadingState, dispatch);
    }
}

export async function handleApiCallWithLoading<T>(
    dispatch: AppDispatch,
    apiFunction: () => Promise<T>,
    errorMessage: string = "Something went wrong"
): Promise<T> {
    const loadingState: LoadingState = {
        loadingTimeout: null,
        loadingStarted: false,
    };

    try {
        const result = callApi(loadingState, dispatch, apiFunction);

        return result as T;
    } catch (error: any) {
        dispatch(addError(errorMessage));
        throw error;
    } finally {
        close(loadingState, dispatch);
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