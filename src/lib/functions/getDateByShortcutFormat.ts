import { MONTHS, SPACE } from "../constants";
import { removeAccents } from "./removeAccents";

export function getDateByShortcutFormat(date: string) {
  const [day, month, year] = date.trim().split(SPACE);
  const output = new Date();
  const monthIndex = MONTHS[removeAccents(month) as keyof typeof MONTHS];
  if (monthIndex === undefined) {
    throw new Error("Invalid month");
  }
  output.setMonth(monthIndex);
  output.setDate(parseInt(day));
  output.setFullYear(parseInt(year));
  output.setHours(0);
  output.setMinutes(0);
  output.setSeconds(0);
  output.setMilliseconds(0);
  return output;
}
