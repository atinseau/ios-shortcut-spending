

export const extractSectionDateFormSectionTitle = (key: string) => {
  return key.split(" ").slice(0, 3).join(" ")
}
