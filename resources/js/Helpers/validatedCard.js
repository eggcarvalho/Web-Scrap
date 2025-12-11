export function validatedCard(number) {
    const cleaned = number.replace(/\D/g, "");

    let sum = 0;
    let doubleDigit = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (doubleDigit) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        doubleDigit = !doubleDigit;
    }

    return cleaned.length >= 13 && cleaned.length <= 19 && sum % 10 === 0;
}
