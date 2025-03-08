import { describe, expect, it } from "bun:test";
import { mergeSpendingBuffer } from "../../src/public/mergeSpendingBuffer";

describe("mergeSpendingBuffer", () => {
  it("Should create a new output if there is no buffer", async () => {
    const output = mergeSpendingBuffer(["", "10 € de pain", "08 mars 2025"]);
    const expected = `Dépense\n\n08 mars 2025 (10€)\n10 € de pain`;
    expect(output).toBe(expected);
  });

  it("Should merge same day spend add", async () => {
    const output1 = mergeSpendingBuffer(["", "10 € de pain", "08 mars 2025"]);
    const output2 = mergeSpendingBuffer([
      output1,
      "14 € de pain",
      "08 mars 2025",
    ]);
    const expected = `Dépense\n\n08 mars 2025 (24€)\n10 € de pain\n14 € de pain`;
    expect(output2).toBe(expected);
  });

  it("Should add spend in spending buffer", async () => {
    const file = await Bun.file(__dirname + "/data-1.txt").text();
    const output = mergeSpendingBuffer([file, "10 € de pain", "08 mars 2025"]);

    const expected = `Dépense\n\n08 mars 2025 (20€)\n10 € de pain\n10 € de pain\n\n07 mars 2025 (3.45€)\n2,2 € Riz\n1,25 € Metro\n\n06 mars 2025 (22.39€)\n22,39 € Monoprix Ludivine Zoé\n\n05 mars 2025 (220.50€)\n8 € Metro retour denis\n10 € Taxi messe…\n200 € Zoé\n2,5 € Métro\n\n04 mars 2025 (21.20€)\n1,2 € Métro\n20 € Verre Denis\n\n03 mars 2025 (38.82€)\n1,2 € Métro\n16 € Chinois\n1,2 € Métro\n20,42 € Monoprix course\n\n02 mars 2025 (19€)\n19 € Péage\n\n01 mars 2025 (220.15€)\n6,8 € Péage\n18,7 € Pat a pain\n134,6 € Protéine Lili\n33,99 € Truffaut mamie\n26,06 € Bouchet mont près chambre\n\n28 févr. 2025 (80.96€)\n32,81 € Boucherie brassièeu\n6,8 € Péage tours\n41,35 € Bar tours\n\n27 févr. 2025 (63.05€)\n1,25 € Metro\n6,8 € Chinois\n1,25 € Métro\n33,75 € Macdo autoroute\n2,1 € Bueno Zoé\n17,9 € Péage\n\n26 févr. 2025 (64.10€)\n6,9 € Kebab\n1,2 € Métro\n38 € Médecin pied\n18 € Macdo\n\n25 févr. 2025 (47.60€)\n28 € Verre Denis\n18,4 € Macdo\n1,2 € Métro`;

    expect(output).toBe(expected);
  });

  it("Should add spend in spending buffer in middle of buffer", async () => {
    const file = await Bun.file(__dirname + "/data-1.txt").text();
    const output = mergeSpendingBuffer([file, "10 € de pain", "01 mars 2025"]);

    const expected = `Dépense\n\n08 mars 2025 (10€)\n10 € de pain\n\n07 mars 2025 (3.45€)\n2,2 € Riz\n1,25 € Metro\n\n06 mars 2025 (22.39€)\n22,39 € Monoprix Ludivine Zoé\n\n05 mars 2025 (220.50€)\n8 € Metro retour denis\n10 € Taxi messe…\n200 € Zoé\n2,5 € Métro\n\n04 mars 2025 (21.20€)\n1,2 € Métro\n20 € Verre Denis\n\n03 mars 2025 (38.82€)\n1,2 € Métro\n16 € Chinois\n1,2 € Métro\n20,42 € Monoprix course\n\n02 mars 2025 (19€)\n19 € Péage\n\n01 mars 2025 (230.15€)\n6,8 € Péage\n18,7 € Pat a pain\n134,6 € Protéine Lili\n33,99 € Truffaut mamie\n26,06 € Bouchet mont près chambre\n10 € de pain\n\n28 févr. 2025 (80.96€)\n32,81 € Boucherie brassièeu\n6,8 € Péage tours\n41,35 € Bar tours\n\n27 févr. 2025 (63.05€)\n1,25 € Metro\n6,8 € Chinois\n1,25 € Métro\n33,75 € Macdo autoroute\n2,1 € Bueno Zoé\n17,9 € Péage\n\n26 févr. 2025 (64.10€)\n6,9 € Kebab\n1,2 € Métro\n38 € Médecin pied\n18 € Macdo\n\n25 févr. 2025 (47.60€)\n28 € Verre Denis\n18,4 € Macdo\n1,2 € Métro`;

    expect(output).toBe(expected);
  });
});
