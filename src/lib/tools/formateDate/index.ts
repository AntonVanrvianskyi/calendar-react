export const formatDateTitle = (date: Date) =>
    date.toLocaleString('default', {month: 'long', year: 'numeric'});
