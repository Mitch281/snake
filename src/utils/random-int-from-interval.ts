/**
 * Minimum and maximum numbers are included.
 */
export default function randomIntFromInterval(
    min: number,
    max: number
): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
