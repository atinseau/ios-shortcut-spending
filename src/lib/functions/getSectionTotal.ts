export function getSectionTotal(data: string[]) {
  return Object.values(data).reduce((acc, value) => {
    const formattedValue = parseFloat(value.replace(",", "."));
    return acc + formattedValue;
  }, 0);
}
