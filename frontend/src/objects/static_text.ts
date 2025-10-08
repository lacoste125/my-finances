export class STATIC_TEXT {

    static NO_CATEGORIES_IN_YEAR = (yearNumber?: number) => `Year ${yearNumber} does not contain any category. Please add a new one.`;
    static PAYMENT_MODAL_TITLE = (year: number, month: string, category: string) => `${year} : ${month}  - ${category}`;
    static COPYRIGHT_BY_MARIUSZ_FOOTER = (year: number) => `ⓒ Copyright by Mariusz ${year}`;
    static AMOUNT_ZL = (amount: string | number) => `${amount} ${STATIC_TEXT.ZL}`;

    static PAYMENT_DISABLED_CLICK_TO_CHANGE = "Płatność w tym miesiącu została wyłączona. Kliknij aby zmienić konfigurację";
    static CONFIRM_DISABLE_MONTH_PAYMENT = "Czy na pewno chcesz wyłączyć płatność w tym miesiącu?";
    static CONFIRM_ENABLE_MONTH_PAYMENT = "Czy na pewno chcesz włączyć płatność w tym miesiącu?";
    static NO_PAYMENTS_IN_CATEGORY = "Kategoria nie zawiera żadnych płatności w tym roku";
    static FILL_ALL_FIELDS_TO_ADD_PAYMENT = "Uzupełnij wszystkie pola aby dodać płatność";
    static CANNOT_DISABLE_PAYMENT = "Nie możesz wyłączyć płatności w tym miesiącu";
    static NEW_YEAR_CONFIRMATION = "Czy chcesz dodać nowy rok do konfiguracji?";
    static NO_MORE_YEARS_IN_CONFIG = "Brak wcześniejszych lat w konfiguracji";
    static CLICK_TO_CREATE_NEW_CATEGORY = "Zaznacz aby dodać nową kategorię";
    static DISABLE_PAYMENT_PLACEHOLDER = "Podaj powód wyłączenia płatności";
    static NO_PAYMENT_THIS_MONTH_TEXT = "BRAK PŁATNOŚCI W TYM MIESIĄCU";
    static DISABLE_PAYMENT_THIS_MONTH = "Wyłącz płatność w tym mesiącu";
    static ADD_NOTE_PLACEHOLDER = "Dodaj notatkę do płatności";
    static WRITE_CATEGORY_NUMBER = "Wpisz nazwę kategorii";
    static PAYMENTS_FROM_YEAR = "Płatności z roku ";
    static ALL_YEARS_SUM = "Suma z wszystkich lat";
    static DISABLE_PAYMENT = "Wyłącz płatność";
    static ADD_NEXT_YEAR = "Dodaj kolejny rok";
    static DEADLINE_WITH_COLON = "Deadline: ";
    static WRITE_DEADLINE = "Wpisz deadline";
    static PREVIOUS_YEAR = "Poprzedni rok";
    static NEW_CATEGORY = "Nowa kategoria";
    static ADD_PAYMENT = "Dodaj płatność";
    static NEXT_YEAR = "Następny rok";
    static ADD_AMOUNT = "Dodaj kwotę";
    static PAYMENTS = "płatności";
    static CONFIRM = "Potwierdź";
    static COMMENT = "Komentarz";
    static DEADLINE = "Deadline";
    static PAYMENT = "płatność";
    static ABORT = "Przerwij";
    static CREATE = "Utwórz";
    static AMOUNT = "Kwota";
    static CLOSE = "Close";
    static FEE = "Opłata";
    static NAME = "Nazwa";
    static DATE = "Data";
    static ADD = "Dodaj";
    static ZL = " zł";
    static OK = "OK";
    static LP = "Lp";
}

export class FORMAT_TEXT {
    static DATE_FORMAT = "YYYY-MM-DD";
}