import { getSectionByDate } from "../lib/functions/getSectionByDate";
import { getSectionTotal } from "../lib/functions/getSectionTotal";

type GetSpendingByDateInput = [string, string];

export function getSpendingByDate(input: GetSpendingByDateInput) {
  const [note, date] = input;
  const sections = getSectionByDate(note);
  const data = sections[date];
  if (!data) {
    return 0;
  }
  return getSectionTotal(data);
}
