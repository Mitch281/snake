export default function roundNumberToNearestTen(num: number): number {
    const remainder = num % 10;
    if (remainder === 0) {
        return num;
    }

    if (1 <= remainder && remainder <= 4) {
        return num - remainder;
    }

    return num + (10 - remainder);
}
