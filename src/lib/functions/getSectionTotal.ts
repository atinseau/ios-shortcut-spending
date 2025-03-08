import { formatNumber } from "./formatNumber";

export function getSectionTotal(data: string[]) {
  return Object.values(data).reduce((acc, value) => {
    const formattedValue = formatNumber(value);
    return acc + formattedValue;
  }, 0);
}
