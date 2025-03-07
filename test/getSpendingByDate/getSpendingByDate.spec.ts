import { describe, expect, it } from "bun:test";
import { getSpendingByDate } from "../../src/public/getSpendingByDate";

describe("getSpendingByDate", () => {
  it("Should be able to get the amount on given date", async () => {
    const file = await Bun.file(__dirname + "/data-1.txt").text();
    const spending = getSpendingByDate([file, "06 mars 2025"]);
    expect(spending).toBe(22.39);
  });

  it("First spending of the file", async () => {
    const file = await Bun.file(__dirname + "/data-1.txt").text();
    const spending = getSpendingByDate([file, "25 févr. 2025"]);
    expect(spending).toBe(28 + 18.4 + 1.2);
  });

  it("Last spending of the file", async () => {
    const file = await Bun.file(__dirname + "/data-1.txt").text();
    const spending = getSpendingByDate([file, "07 mars 2025"]);
    expect(spending).toBe(2.2 + 1.25);
  });
});
