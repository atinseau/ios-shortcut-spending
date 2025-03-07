import { EMPTY, LINE_BREAK } from "../constants";
import { isShortcutDate } from "./isShortcutDate";

export const getSectionByDate = (buffer: string) => {
  const formattedBuffer = buffer
    .trim()
    .replace("Dépense", EMPTY)
    .split(LINE_BREAK)
    .map((line) => line.trim());

  return formattedBuffer.reduce(
    (acc, value) => {
      const formattedValue = value.trim();
      if (!formattedValue.length) {
        return acc;
      }
      if (isShortcutDate(formattedValue)) {
        acc[formattedValue] = [];
      } else {
        const dateKey = Object.keys(acc).pop();
        if (dateKey) {
          acc[dateKey].push(value);
        }
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );
};
