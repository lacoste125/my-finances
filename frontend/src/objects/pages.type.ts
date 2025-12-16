export enum Path {
    ROOT = "/",
    PAYMENTS = "/payments",
    SETTINGS = "/settings",
    ABOUT = "/about",
    ADMIN_TOOLS = "/admin-tools",
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
        name: "Admin tools",
        path: Path.ADMIN_TOOLS,
    },
    {
        name: "O aplikacji",
        path: Path.ABOUT,
    }
];