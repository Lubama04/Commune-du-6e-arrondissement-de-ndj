/**
 * Hook générique pour charger les données depuis src/data/*.json.
 * Aujourd'hui : import statique synchrone. Demain (Supabase) : remplacer
 * le corps de ce hook par un appel `supabase.from(table).select()` sans
 * changer la signature — aucun composant appelant n'aura à être modifié.
 */
export function useData<T>(jsonData: T): T {
  return jsonData;
}
