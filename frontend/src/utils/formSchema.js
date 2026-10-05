import { z } from "zod";

/**
 * Zod → JSON Schema (subset), dipakai untuk introspeksi bentuk data:
 * apakah sebuah field berupa array, berapa panjang minimum/maksimum-nya.
 *
 * Sumber kebenaran validasi tetap schema zod-nya sendiri; file ini
 * hanya mencegahmagic number hardcoded (mis. batas 30 baris dynamic list)
 * discolor di beberapa tempat sekaligus.
 */
const inspect = (schema) =>
  z.toJSONSchema(schema, { io: "input", unrepresentable: "any" });

/** Metadata sebuah field berupa array. */
export const toArrayMeta = (schema, fieldPath) => {
  const field = inspect(schema)?.properties?.[fieldPath];

  if (!field) return { isArray: false, min: 1, max: 30 };

  return {
    isArray: field.type === "array",
    min: Number.isInteger(field.minItems) ? field.minItems : 1,
    max: Number.isInteger(field.maxItems) ? field.maxItems : 30,
  };
};

/** Nilai yang diizinkan untuk field enum (dipakai untuk opsi select). */
export const enumOptions = (schema, fieldPath) => {
  const field = inspect(schema)?.properties?.[fieldPath];

  if (!field) return [];

  //_ zod v4 membungkus enum di `anyOf` bila field punya default
  const candidates = field.anyOf ?? [field];

  const values = candidates.flatMap((entry) =>
    Array.isArray(entry?.enum) ? entry.enum : [],
  );

  return [...new Set(values.map(String))];
};