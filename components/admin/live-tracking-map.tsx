'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DivIcon } from 'leaflet';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { Bus } from 'lucide-react';
import { buses } from '@/lib/data';

const CAMPUS_CENTER: [number, number] = [28.5449, 77.1925];
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ROUTE_WAYPOINTS: [number, number][] = [
  [28.5458, 77.1906],
  [28.5471, 77.1927],
  [28.546, 77.1951],
  [28.5436, 77.1943],
  [28.5428, 77.1914],
  [28.5443, 77.1898],
  [28.5458, 77.1906],
];

const FALLBACK_ROUTE: [number, number][] = [
  [28.5458, 77.1906],
  [28.5467, 77.1918],
  [28.5471, 77.1927],
  [28.5466, 77.1941],
  [28.546, 77.1951],
  [28.5449, 77.1948],
  [28.5436, 77.1943],
  [28.5429, 77.1932],
  [28.5428, 77.1914],
  [28.5436, 77.1904],
  [28.5443, 77.1898],
  [28.5452, 77.1899],
  [28.5458, 77.1906],
];

function toMeters([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return 2 * 6371000 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function interpolateRoute(route: [number, number][], count: number) {
  if (route.length === 0) return [];
  if (route.length === 1) return Array.from({ length: count }, () => route[0]);

  const cumulativeDistances = [0];
  let totalDistance = 0;

  for (let index = 1; index < route.length; index += 1) {
    totalDistance += toMeters(route[index - 1], route[index]);
    cumulativeDistances.push(totalDistance);
  }

  return Array.from({ length: count }, (_, busIndex) => {
    const targetDistance = totalDistance * ((busIndex + 1) / (count + 1));

    for (let index = 1; index < cumulativeDistances.length; index += 1) {
      const segmentStart = cumulativeDistances[index - 1];
      const segmentEnd = cumulativeDistances[index];

      if (targetDistance <= segmentEnd) {
        const segmentLength = segmentEnd - segmentStart || 1;
        const ratio = (targetDistance - segmentStart) / segmentLength;
        const start = route[index - 1];
        const end = route[index];

        return [
          start[0] + (end[0] - start[0]) * ratio,
          start[1] + (end[1] - start[1]) * ratio,
        ] as [number, number];
      }
    }

    return route[route.length - 1];
  });
}

export function LiveTrackingMap() {
  const [routePath, setRoutePath] = useState<[number, number][]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadRoute = async () => {
      const path = ROUTE_WAYPOINTS.map(([lat, lng]) => `${lng},${lat}`).join(';');

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson&steps=false`
        );
        const data = await response.json();
        const coordinates = data?.routes?.[0]?.geometry?.coordinates?.map(
          ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
        );

        if (!cancelled && Array.isArray(coordinates) && coordinates.length > 1) {
          setRoutePath(coordinates);
          return;
        }
      } catch {
        // Fall back to a static campus loop if the routing service is unavailable.
      }

      if (!cancelled) {
        setRoutePath(FALLBACK_ROUTE);
      }
    };

    loadRoute();

    return () => {
      cancelled = true;
    };
  }, []);

  const busPositions = useMemo(
    () =>
      buses.map((bus, index) => ({
        ...bus,
        coordinates: interpolateRoute(routePath.length > 1 ? routePath : FALLBACK_ROUTE, buses.length)[index] ?? CAMPUS_CENTER,
      })),
    [routePath]
  );

  const createBusIcon = (busNumber: string, status: string) =>
    new DivIcon({
      className: 'bus-marker-icon',
      html: `
        <div class="grid h-10 w-10 place-items-center rounded-[1.1rem] text-[11px] font-semibold text-white shadow-[0_14px_24px_rgba(15,23,42,0.12)] ${
          status === 'active' ? 'bg-[#00687a]' : status === 'delayed' ? 'bg-[#ba1a1a]' : 'bg-[#565e74]'
        }">
          ${busNumber}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

  return (
    <section className="glass-panel overflow-hidden rounded-4xl border border-[#e0e3e5]">
      <div className="flex items-center justify-between border-b border-[#e0e3e5]/80 px-6 py-5 sm:px-7">
        <div>
          <h2 className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-[#191c1e]">Road-following tracking view</h2>
        </div>
      </div>

      <div className="relative min-h-136 overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,238,240,0.92))]">
        <MapContainer center={CAMPUS_CENTER} zoom={14.6} zoomControl={false} scrollWheelZoom className="absolute inset-0 h-full w-full">
          <ZoomControl position="topright" />
          <TileLayer
            url={TILE_URL}
            attribution={TILE_ATTRIBUTION}
            eventHandlers={{}}
          />
          <Polyline pathOptions={{ color: '#00687a', weight: 5, opacity: 0.8 }} positions={routePath.length > 1 ? routePath : FALLBACK_ROUTE} />
          {busPositions.map((bus) => (
            <Marker key={bus.id} position={bus.coordinates} icon={createBusIcon(bus.number, bus.status)}>
              <Tooltip direction="top" offset={[0, -18]} opacity={1} permanent={false}>
                <div className="space-y-1 text-left">
                  <p className="text-sm font-semibold text-[#191c1e]">Bus {bus.number}</p>
                  <p className="text-xs text-[#45464d]">{bus.route}</p>
                  <p className="text-xs text-[#45464d]">Driver: {bus.driver}</p>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>

        
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-[#e0e3e5]/80 px-6 py-4 text-xs text-[#45464d] sm:px-7">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00687a]" /> Active
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ba1a1a]" /> Delayed
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#565e74]" /> Inactive
        </div>
        
      </div>
    </section>
  );
}