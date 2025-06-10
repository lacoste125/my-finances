import {MonthType} from "./payment.type";

export interface RequestBody {
}

export interface AddPaymentRequestBody extends RequestBody {
    amount: number,
    comment: string,
    date: string,
    monthName: MonthType,
    yearCategoryId: number
}

export interface AddCategoryToYearRequestBody extends RequestBody {
    categoryId?: number,
    yearId?: number
}

export interface CreateCategoryAndAddToYearRequestBody extends RequestBody {
    name: string,
    deadline: string,
    yearNumber: number
}

export interface TogglePaymentRequestBody extends RequestBody {
    monthName: MonthType,
    yearCategoryId: number,
    comment?: string
}

export interface EnablePaymentRequestBody extends RequestBody {
    monthName: string,
    yearCategoryId: number
}