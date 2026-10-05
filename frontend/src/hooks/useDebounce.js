import { useEffect, useState } from "react";

/**
 * Debounce nilai primitive.
 *
 * Menggantikan pola manual yang berulang di 4 view:
 *   useEffect(() => { const t = setTimeout(...); return () => clearTimeout(t) }, [value])
 *
 * @param {*} value  nilai yang ingin ditunda
 * @param {number} delay  jeda dalam milidetik
 * @returns {*} nilai yang sudah stabil selama `delay` ms
 */
export const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

/**
 * Debounce nilai object/array berdasarkan perbandingan serialisasi.
 *
 * Berguna untuk object filter yang dibuat inline setiap render:
 * tanpa ini, `queryKey` berubah terus-menerus karena objek baru
 * dibuat setiap render.
 */
export const useDebouncedObject = (value, delay = 500) => {
  const serialized = JSON.stringify(value ?? null);

  const debouncedSerialized = useDebounce(serialized, delay);

  return JSON.parse(debouncedSerialized);
};