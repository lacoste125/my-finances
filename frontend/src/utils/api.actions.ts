// years
export const YEARS_API_PATH = "years";
export const GET_YEAR_BY_YEAR_NUMBER_API_PATH = (yearNumber: number) => `${YEARS_API_PATH}/by-number/${yearNumber}`;

// payments
export const PAYMENTS_API_PATH = "payments";
export const ENABLE_PAYMENT_API_PATH = `${PAYMENTS_API_PATH}/enable`;
export const DISABLE_PAYMENT_API_PATH = `${PAYMENTS_API_PATH}/disable`;
export const GET_PAYMENTS_BY_YEAR_CATEGORY_ID_API_PATH = (yearCategoryId: number) => `${PAYMENTS_API_PATH}/by-year-category-id/${yearCategoryId}`;

// categories
export const GET_ALL_CATEGORIES_API_PATH = "categories/getAllCategories";

// year-categories
export const ADD_CATEGORY_TO_YEAR_API_PATH = "year-categories/addCategoryToYear";
export const CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH = "year-categories/addNewCategoryToYear";