import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Correctif standard Leaflet + bundlers (Vite) : les chemins d'icônes par
// défaut ne sont pas résolus automatiquement.
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapMarker {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

const CENTER: [number, number] = [12.09464, 15.07539];

const MARKERS: MapMarker[] = [
  {
    id: 'mairie',
    name: 'Mairie du 6ᵉ Arrondissement',
    description: 'Position approximative — à confirmer auprès de la mairie.',
    coordinates: { lat: 12.09464, lng: 15.07539 },
  },
  {
    id: 'marche-arc-en-ciel',
    name: 'Marché Espace Arc-en-Ciel',
    description: 'Moursal — ex-Marché Mokolo.',
    coordinates: { lat: 12.0958, lng: 15.0762 },
  },
  {
    id: 'universite-emi-koussi',
    name: 'Université Emi Koussi',
    description: 'Moursal — avenue Kondol.',
    coordinates: { lat: 12.0935, lng: 15.0741 },
  },
  {
    id: 'canal-jardiniers',
    name: 'Canal des Jardiniers',
    description: 'Paris-Congo — limite ouest de la commune, projet PACAJ.',
    coordinates: { lat: 12.092, lng: 15.069 },
  },
];

interface MapEmbedProps {
  height?: number;
}

/**
 * Carte Leaflet + OpenStreetMap implémentée en Leaflet natif (plutôt que via
 * react-leaflet) pour éviter les doubles-initialisations du conteneur DOM
 * sous React 19 StrictMode. Cycle de vie géré manuellement : création au
 * montage, destruction systématique au démontage.
 */
export function MapEmbed({ height = 420 }: MapEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = L.map(container, { scrollWheelZoom: false }).setView(CENTER, 14);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs',
    }).addTo(map);

    MARKERS.forEach((marker) => {
      L.marker([marker.coordinates.lat, marker.coordinates.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(`<strong>${marker.name}</strong><br/>${marker.description}`);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-lg border border-[color:var(--color-border)]"
      style={{ height }}
      role="group"
      aria-label="Carte du 6ᵉ arrondissement de N'Djaména"
    />
  );
}
