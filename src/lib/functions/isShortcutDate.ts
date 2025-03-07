export const SHORTCUT_REGEX = /^(\d{1,2}) (.+) (\d{4})/;

export const isShortcutDate = (date: string) => {
  return SHORTCUT_REGEX.test(date);
};
