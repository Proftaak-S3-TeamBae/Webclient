/**
 * Gets the friendly date/time.
 */
export function friendlyDate(date: Date) {
    return `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
}