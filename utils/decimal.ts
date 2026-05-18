import type { SerializedDecimal } from "@/types/quiz.types";

/** Convert Prisma serialized Decimal {s, e, d} to a JS number */
export function decimalToNumber(
  val: SerializedDecimal | number | null | undefined,
): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "object" && "d" in val) {
    // Reconstruct: sign * digits * 10^(e - (digits.length - 1))
    const digits = val.d.reduce(
      (acc, d, i) => acc + d * Math.pow(10, val.d.length - 1 - i),
      0,
    );
    // e is the exponent of the most significant digit
    const num = val.s * digits * Math.pow(10, val.e - (val.d.length - 1));
    return num;
  }
  return Number(val);
}

export function formatScore(
  val: SerializedDecimal | number | null | undefined,
): string {
  const num = decimalToNumber(val);
  return num.toFixed(2);
}
