
export const frmPrice = (price: number,isSymbol=true, locale: string = 'en-US', currency: string = 'USD'): string => {
    if (isSymbol) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(price);
    }
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
} 