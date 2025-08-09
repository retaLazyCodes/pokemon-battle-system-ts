export function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function titleCase(text: string): string {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}