const MOIS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

/** Formate une date ISO (YYYY-MM-DD) en texte français long : "29 décembre 2024" */
export function formatDateFr(iso: string | null | undefined): string {
  if (!iso) return 'Date non précisée';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MOIS_FR[m - 1]} ${y}`;
}

/** Formate une date ISO en version courte : "29 déc. 2024" */
export function formatDateShortFr(iso: string | null | undefined): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MOIS_FR[m - 1].slice(0, 3)}. ${y}`;
}

/** Formate un nombre avec séparateur de milliers francophone : 66000 -> "66 000" */
export function formatNumberFr(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('fr-FR').format(value);
}

/** Formate un montant en FCFA : 7182173702 -> "7 182 173 702 FCFA" */
export function formatFcfa(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'Montant non communiqué';
  return `${formatNumberFr(value)} FCFA`;
}

/** Vrai si "today" (par défaut la date système) se situe dans [dateISO, endISO] */
export function isDateWithinRange(startIso: string, endIso: string, today: Date = new Date()): boolean {
  const start = new Date(startIso);
  const end = new Date(endIso);
  return today >= start && today <= end;
}
