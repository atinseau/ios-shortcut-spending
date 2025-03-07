import { describe, expect, it } from "bun:test";
import { mergeSpendingBuffer } from "../../src/public/mergeSpendingBuffer";

describe("mergeSpendingBuffer", () => {
  it("Should create a new output if there is no buffer", async () => {
    const output = mergeSpendingBuffer(["", "10 € de pain", "08 mars 2025"]);
    const expected = `Dépense\n\n08 mars 2025 (10€)\n10 € de pain`;
    expect(output).toBe(expected);
  });

  it("Should add spend in spending buffer", async () => {
    const file = await Bun.file(__dirname + "/data-1.txt").text();
    const output = mergeSpendingBuffer([file, "10 € de pain", "08 mars 2025"]);
    const expected = `Dépense\n\n08 mars 2025 (10€)\n10 € de pain\n\n${file.replace("Dépense", "").trim()}`;
    expect(output).toBe(expected);
  });
});
