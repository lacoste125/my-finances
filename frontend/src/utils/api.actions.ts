const BASE_API_PATH = (apiPath: string) => `http://localhost:8181/api/${apiPath}`;
export const GET_YEAR_BY_YEAR_NUMBER_API_PATH = (yearNumber: number) => `years/getYearByYearNumber?yearNumber=${yearNumber}`;
export const ADD_PAYMENT_API_PATH = "payments/addPayment";
export const YEARS = "years";
export const GET_ALL_CATEGORIES_API_PATH = "categories/getAllCategories";
export const ADD_CATEGORY_TO_YEAR_API_PATH = "year-categories/addCategoryToYear";
export const CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH = "year-categories/addNewCategoryToYear";
export const CREATE_NEXT_YEAR_API_PATH = "years/createNextYear";
export const GET_CATEGORY_PAYMENTS_BY_ID_API_PATH = (categoryId: number) => `payments/getCategoryPayments?categoryId=${categoryId}`;
export const DISABLE_PAYMENT_API_PATH = "payments/disablePayment";
export const ENABLE_PAYMENT_API_PATH = "payments/enablePayment";

export const GET = async <T>(
    onSuccess: (resp: T) => void,
    apiPath: string,
) => {
    try {
        const response = await fetch(BASE_API_PATH(apiPath));
        const jsonData: T = await response.json();
        onSuccess(jsonData);
    } catch (error) {
        console.error("Error GET data: ", error);
    }
};

export const CREATE = async <T>(
    apiPath: string,
    requestBody: T,
    method?: "POST" | "PUT"
) => {
    try {
        await fetch(
            BASE_API_PATH(apiPath),
            {
                method: method || "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error("Error " + method + " data: ", error);
    }
};