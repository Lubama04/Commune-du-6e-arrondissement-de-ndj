/**
 * Types TypeScript de toutes les entités du site.
 * Schéma pensé pour une migration directe vers des tables Supabase
 * (un fichier JSON = une table, un objet = une ligne).
 */

export type ReliabilityLevel = 'verifie' | 'a_confirmer' | 'non_trouve';

export interface Commune {
  id: string;
  name: string;
  name_short: string;
  city: string;
  country: string;
  region: string;
  description: string;
  area_ha: number;
  area_source: string;
  area_verification: ReliabilityLevel;
  population_estimate: number;
  population_year: number | null;
  population_source: string;
  population_verification: ReliabilityLevel;
  population_note: string;
  registered_voters_2024: number;
  registered_voters_source: string;
  registered_voters_verification: ReliabilityLevel;
  quarters_count: number;
  carres_count: number;
  device: string;
  status: string;
  legal_texts: string[];
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  boundaries_verification: ReliabilityLevel;
  coordinates: { lat: number; lng: number; precision: string };
  mairie_address: string;
  mairie_phone: string;
  mairie_phone_verification: ReliabilityLevel;
  mairie_email: string | null;
  mairie_email_verification: ReliabilityLevel;
  mairie_hours: string;
  website: string;
  website_official_status: ReliabilityLevel;
  logo_url: string | null;
  logo_verification: ReliabilityLevel;
}

export interface Elu {
  full_name: string;
  role: string;
  verification: ReliabilityLevel;
  source: string;
  photo_url: string | null;
  party?: string;
  decree?: string;
}

export interface ResultatElection {
  parti: string;
  voix: number;
  pct: number;
  sieges: number;
}

export interface Elections2024 {
  date: string;
  results_date: string;
  source: string;
  verification: ReliabilityLevel;
  inscrits: number;
  votants: number;
  bulletins_nuls: number;
  suffrages_exprimes: number;
  taux_participation_pct: number;
  total_sieges: number;
  resultats: ResultatElection[];
  note_contradiction: string;
}

export interface Gouvernance {
  maire: Elu;
  adjoint: Elu;
  administratrice_deleguee: Elu;
  elections_2024: Elections2024;
  conseillers: string[];
  conseillers_verification: ReliabilityLevel;
  conseillers_source: string;
  tutelle: {
    mairie_ville: string;
    maire_ville: string;
    delegue_general: string;
    ministere: string;
  };
}

export interface Quartier {
  id: string;
  slug: string;
  name: string;
  description: string;
  history: string;
  history_verification: ReliabilityLevel;
  population_estimate: number | null;
  population_note?: string;
  coordinates: { lat: number; lng: number };
  equipements_notables?: string[];
  verification: ReliabilityLevel;
}

export interface Projet {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: 'en_cours' | 'realise' | 'planifie';
  start_date: string | null;
  end_date: string | null;
  budget_fcfa: number | null;
  funder: string;
  partner?: string;
  advancement_pct?: number;
  advancement_date?: string;
  advancement_source?: string;
  beneficiaries?: string;
  quartiers?: string[];
  verification: ReliabilityLevel;
}

export interface Actualite {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  source: string;
  verification: ReliabilityLevel;
  is_alert?: boolean;
  alert_end_date?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  required_documents: string[];
  procedure?: string;
  delay?: string;
  cost_fcfa: number | null;
  cost_note?: string;
  is_online: boolean;
  contact?: string;
  verification: ReliabilityLevel;
}

export interface Stat {
  id: string;
  indicator: string;
  value: number;
  unit: string;
  year: number | null;
  source: string;
  reliability: ReliabilityLevel;
  note?: string;
}

export interface Partenaire {
  id: string;
  name: string;
  type: string;
  description: string;
  project?: string;
  period?: string;
  logo_url: string | null;
  verification: ReliabilityLevel;
}

export interface EquipementItem {
  id: string;
  name: string;
  type: string;
  quartier: string;
  description: string;
  coordinates?: { lat: number; lng: number };
  verification: ReliabilityLevel;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  date: string;
  file_url: string | null;
  description: string;
  verification: ReliabilityLevel;
}

export interface GalerieItem {
  id: string;
  title: string;
  category: string;
  date: string;
  verification: ReliabilityLevel;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  end_date?: string;
  location: string;
  description: string;
  category: string;
  verification: ReliabilityLevel;
}
