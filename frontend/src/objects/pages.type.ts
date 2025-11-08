export enum Path {
    ROOT = "/",
    PAYMENTS = "/payments",
    SETTINGS = "/settings",
    ABOUT = "/about",
}

export interface Page {
    name: string,
    path: Path,
}

export const Pages: Page[] = [
    {
        name: "Strona główna",
        path: Path.ROOT,
    },
    {
        name: "Payments",
        path: Path.PAYMENTS,
    },
    {
        name: "Ustawienia",
        path: Path.SETTINGS,
    },
    {
        name: "O aplikacji",
        path: Path.ABOUT,
    }
];