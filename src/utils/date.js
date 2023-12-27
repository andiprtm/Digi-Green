function getFormattedDate({ date, month, year }) {

    return new Date(year, month, date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default getFormattedDate;