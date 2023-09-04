export const formatDateTime = (tz, dateString) => {
    const dateObj = new Date(dateString);
    dateObj.setUTCHours(dateObj.getUTCHours() + tz);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; //month start from 0:  0-11
    const year = dateObj.getUTCFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}