export interface Payment {
    id: number,
    yearCategoryId: number,
    year: number,
    month: MonthType,
    amount: number,
    date: string,
    comment: string,
    valid: boolean,
}

export interface CategoryType {
    id: number,
    name: string,
    deadline: string,
}

export interface YearCategory {
    id: number,
    yearId: number,
    categoryType: CategoryType,
    payments: Payment[],
    disabledPayments: DisabledPayment[],
}

export interface Year {
    id: number,
    name: number,
    categories: YearCategory[],
}

export interface CategoryDetails {
    category: CategoryType,
    payments: Payment[],
    //to add when with img/pdf implementation
    image: object,
}

export interface DisabledPayment {
    id: number,
    month: Month,
    yearCategoryId: number,
    comment?: string,
    valid: boolean,
}

export interface Month {
    id: number,
    name: MonthType,
    order: number,
}

export enum MonthType {
    STYCZEN = "STYCZEN",
    LUTY = "LUTY",
    MARZEC = "MARZEC",
    KWIECIEN = "KWIECIEN",
    MAJ = "MAJ",
    CZERWIEC = "CZERWIEC",
    LIPIEC = "LIPIEC",
    SIERPIEN = "SIERPIEN",
    WRZESIEN = "WRZESIEN",
    PAZDZIERNIK = "PAZDZIERNIK",
    LISTOPAD = "LISTOPAD",
    GRUDZIEN = "GRUDZIEN",
}