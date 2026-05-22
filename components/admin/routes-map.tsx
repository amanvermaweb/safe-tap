'use client';

import { useMemo } from 'react';
import { MapContainer, Polyline, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';

import { buses } from '@/lib/data';

const CAMPUS_CENTER: [number, number] = [28.5449, 77.1925];
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ROUTE_LIBRARY: Record<string, [number, number][]> = {
  northwood: [
    [28.5447, 77.1887],
    [28.5461, 77.1893],
    [28.5472, 77.1911],
    [28.5471, 77.1935],
    [28.5457, 77.1951],
    [28.5438, 77.1943],
    [28.5429, 77.1924],
    [28.5434, 77.1904],
    [28.5447, 77.1887],
  ],
  oakridge: [
    [28.542, 77.1912],
    [28.5426, 77.1937],
    [28.5441, 77.1949],
    [28.5461, 77.1955],
    [28.5472, 77.1938],
    [28.5467, 77.1913],
    [28.5452, 77.1898],
    [28.5434, 77.1892],
    [28.542, 77.1912],
  ],
  downtown: [
    [28.5457, 77.1972],
    [28.5476, 77.1963],
    [28.5482, 77.1938],
    [28.5474, 77.191],
    [28.5458, 77.1893],
    [28.5437, 77.1888],
    [28.5422, 77.1907],
    [28.5426, 77.1932],
    [28.5441, 77.1955],
    [28.5457, 77.1972],
  ],
};

const FALLBACK_ROUTE: [number, number][] = [
  [28.5456, 77.1891],
  [28.5468, 77.1901],
  [28.5472, 77.1922],
  [28.5467, 77.1942],
  [28.5451, 77.1953],
  [28.5435, 77.1947],
  [28.5428, 77.1928],
  [28.5432, 77.1907],
  [28.5443, 77.1895],
  [28.5456, 77.1891],
];

const ROUTE_COLORS = ['#00687a', '#ba1a1a', '#6d28d9', '#0f766e', '#b45309'];

function normalizeRouteKey(route: string) {
  return route.trim().toLowerCase();
}

function shiftRoute(route: [number, number][], latOffset: number, lngOffset: number) {
  return route.map(([lat, lng]) => [lat + latOffset, lng + lngOffset] as [number, number]);
}

function getRoutePath(routeName: string, index: number) {
  const preset = ROUTE_LIBRARY[normalizeRouteKey(routeName)];

  if (preset) {
    return preset;
  }

  const latOffset = ((index % 3) - 1) * 0.00045;
  const lngOffset = ((index % 2) - 0.5) * 0.00045;

  return shiftRoute(FALLBACK_ROUTE, latOffset, lngOffset);
}

export function RoutesMap() {
  const routeSeries = useMemo(
    () =>
      buses.map((bus, index) => ({
        ...bus,
        color: ROUTE_COLORS[index % ROUTE_COLORS.length],
        path: getRoutePath(bus.route, index),
      })),
    []
  );

  return (
    <section className="glass-panel overflow-hidden rounded-4xl border border-[#e0e3e5]">
      

      <div className="relative min-h-136 overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,238,240,0.92))]">
        <MapContainer
          center={CAMPUS_CENTER}
          zoom={14.6}
          zoomControl={false}
          scrollWheelZoom
          className="absolute inset-0 h-full w-full"
        >
          <ZoomControl position="topright" />
          <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} eventHandlers={{}} />

          {routeSeries.map((bus) => (
            <Polyline
              key={bus.id}
              pathOptions={{ color: bus.color, weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }}
              positions={bus.path}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>
                <div className="space-y-1 text-left">
                  <p className="text-sm font-semibold text-[#191c1e]">Bus {bus.number}</p>
                  <p className="text-xs text-[#45464d]">Route: {bus.route}</p>
                  <p className="text-xs text-[#45464d]">Driver: {bus.driver}</p>
                </div>
              </Tooltip>
            </Polyline>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-[#e0e3e5]/80 px-6 py-4 text-xs text-[#45464d] sm:px-7">
        {routeSeries.map((bus) => (
          <div key={bus.id} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bus.color }} />
            Bus {bus.number} · {bus.route}
          </div>
        ))}
      </div>
    </section>
  );
}
