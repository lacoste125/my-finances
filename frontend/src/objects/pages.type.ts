import HomePage from "../components/pages/HomePage";
import PaymentsPage from "../components/pages/PaymentsPage";

export const Pages = {
    HOME_PAGE: {
        name: "Home",
        link: "/",
        element: HomePage
    },
    PAYMENTS_PAGE: {
        name: "Payments",
        link: "/payments",
        element: PaymentsPage
    }
}