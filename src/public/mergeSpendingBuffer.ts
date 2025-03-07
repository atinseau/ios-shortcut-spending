import { EMPTY, LINE_BREAK } from "../lib/constants";
import { getDateByShortcutFormat } from "../lib/functions/getDateByShortcutFormat";
import { getSectionByDate } from "../lib/functions/getSectionByDate";
import { getSectionTotal } from "../lib/functions/getSectionTotal";

type MergeSpendingBufferInput = [string, string, string];

function getSectionTitle(key: string, sections: string[]) {
  const value = key.split(" ").slice(0, 3).join(" ");
  const total = getSectionTotal(sections);
  const amount = total.toFixed(total.toString().split(".").length > 1 ? 2 : 0);
  return value + ` (${amount}€)` + LINE_BREAK;
}

export function mergeSpendingBuffer(input: MergeSpendingBufferInput) {
  try {
    const [buffer, spend, now] = input;
    const sections = getSectionByDate(buffer);

    if (!sections[now]) {
      sections[now] = [];
    }
    sections[now].push(spend);

    const orderedKeys = Object.keys(sections).sort((a, b) => {
      return getDateByShortcutFormat(a) > getDateByShortcutFormat(b) ? -1 : 1;
    });

    const newBuffer = orderedKeys.reduce((acc, key) => {
      acc += getSectionTitle(key, sections[key]);

      acc += sections[key].join(LINE_BREAK);
      if (sections[key].length) {
        acc += LINE_BREAK;
      }
      acc += LINE_BREAK;
      return acc;
    }, EMPTY);

    let output = "Dépense" + LINE_BREAK + LINE_BREAK;
    output += newBuffer.trim();
    return output;
  } catch (e) {
    const error = e as Error;
    return error?.message || "Une erreur c'est produite";
  }
}
