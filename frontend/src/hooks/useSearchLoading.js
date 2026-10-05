import { useDebounce } from "@/hooks/useDebounce";

/**
 * Flag "sedang mencari" untuk input search.
 *
 * Dihitung (diturunkan) dari state, bukan di-sinkronkan lewat
 * useEffect — menghindari satu render tambahan dan melanggar
 * aturan `set-state-in-effect`.
 *
 * @param {string} searchTerm  input mentah
 * @param {boolean} isFetching  status loading dari query
 * @param {number} delay  jeda debounce
 */
export const useSearchLoading = (searchTerm, isFetching, delay = 500) => {
  const debounced = useDebounce(searchTerm, delay);

  // masih menunggu debounce, atau request belum selesai
  return searchTerm.trim() !== debounced.trim() || isFetching;
};