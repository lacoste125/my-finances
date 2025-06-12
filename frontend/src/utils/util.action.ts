export const getDateFromString = (date: Date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();

    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    return year + "-" + month + "-" + day;
};

export function getBorder(open: boolean, isLastRow?: boolean) : string {
    return open || isLastRow ? "border-bottom" : "border-bottom-0";
}