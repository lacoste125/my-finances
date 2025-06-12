import {MonthType} from "./payment.type";

export interface AddPaymentRequestBody {
    amount: number,
    comment: string,
    date: string,
    monthName: MonthType,
    yearCategoryId: number
}

export interface AddCategoryToYearRequestBody {
    categoryId?: number,
    yearId?: number
}

export interface CreateCategoryAndAddToYearRequestBody {
    name: string,
    deadline: string,
    yearNumber: number
}

export interface TogglePaymentRequestBody {
    monthName: MonthType,
    yearCategoryId: number,
    comment?: string
}

export interface EnablePaymentRequestBody {
    monthName: string,
    yearCategoryId: number
}