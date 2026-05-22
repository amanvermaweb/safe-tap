"use client";

import { useEffect, useMemo, useState } from "react";
import { DivIcon } from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, ZoomControl } from "react-leaflet";

import type { MapStop } from "@/types/parent";

const CAMPUS_CENTER: [number, number] = [28.5458, 77.1929];
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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

function createStopIcon() {
  return new DivIcon({
    className: "parent-stop-marker",
    html: `
      <div class="flex h-4 w-4 items-center justify-center">
        <span class="h-3 w-3 rounded-full border-2 border-white bg-[#006172] shadow-[0_0_0_6px_rgba(87,223,254,0.16)]"></span>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function createBusIcon(label: string) {
  return new DivIcon({
    className: "parent-bus-marker",
    html: `
      <div class="flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#006172] shadow-[0_14px_28px_rgba(15,23,42,0.18)]">
        <span class="flex h-6 w-6 items-center justify-center rounded-full bg-[#006172] text-[10px] font-bold text-white">BUS</span>
        <span>${label}</span>
      </div>
    `,
    iconSize: [92, 30],
    iconAnchor: [46, 15],
  });
}

function nearestPointOnPolyline(pt: [number, number], poly: [number, number][]) {
  if (!poly || poly.length === 0) return pt;

  let best: [number, number] = poly[0];
  let bestDist = Infinity;

  for (let i = 1; i < poly.length; i += 1) {
    const a = poly[i - 1];
    const b = poly[i];

    // project pt onto segment ab
    const ax = a[0];
    const ay = a[1];
    const bx = b[0];
    const by = b[1];
    const vx = bx - ax;
    const vy = by - ay;
    const wx = pt[0] - ax;
    const wy = pt[1] - ay;
    const c1 = vx * wx + vy * wy;
    const c2 = vx * vx + vy * vy;
    const t = c2 === 0 ? 0 : Math.max(0, Math.min(1, c1 / c2));

    const proj: [number, number] = [ax + vx * t, ay + vy * t];

    const d = toMeters(pt, proj);
    if (d < bestDist) {
      bestDist = d;
      best = proj;
    }
  }

  return best;
}

interface LiveRouteMapProps {
  stops: MapStop[];
  routeLabel: string;
}

export function LiveRouteMap({ stops, routeLabel }: LiveRouteMapProps) {
  const routePoints = useMemo(
    () => (stops.length > 1 ? stops.map((stop) => stop.coordinates) : [CAMPUS_CENTER]),
    [stops]
  );
  const [routedPoints, setRoutedPoints] = useState<[number, number][] | null>(null);

  useEffect(() => {
    let aborted = false;

    async function fetchRoute() {
      if (routePoints.length < 2) {
        setRoutedPoints(null);
        return;
      }

      try {
        // OSRM expects lon,lat pairs
        const coords = routePoints
          .map(([lat, lng]) => `${lng},${lat}`)
          .join(";");

        const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Routing request failed");

        const data = await res.json();
        const geo = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;

        if (!aborted && geo && geo.length > 0) {
          // convert from [lng, lat] to [lat, lng]
          setRoutedPoints(geo.map(([lng, lat]) => [lat, lng]));
        }
      } catch (err) {
        // fail silently and keep routedPoints null (fallback to straight lines)
        setRoutedPoints(null);
      }
    }

    fetchRoute();

    return () => {
      aborted = true;
    };
  }, [routePoints]);

  const effectiveRoute = routedPoints ?? routePoints;
  const interpolatedPoints = useMemo(() => interpolateRoute(effectiveRoute, 24), [effectiveRoute]);
  const [busIndex, setBusIndex] = useState(0);

  useEffect(() => {
    if (interpolatedPoints.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setBusIndex((current) => (current + 1) % interpolatedPoints.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [interpolatedPoints.length]);

  const busPosition = interpolatedPoints[busIndex] ?? routePoints[0] ?? CAMPUS_CENTER;
  const busLabel = routeLabel.split(" - ")[0] ?? "Bus B12";
  const snappedBusPosition = nearestPointOnPolyline(busPosition, effectiveRoute);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e0e3e5] bg-white/70">
      <div className="relative h-[28rem] w-full sm:h-[32rem] lg:h-[34rem]">
        <MapContainer
          center={routePoints[0] ?? CAMPUS_CENTER}
          zoom={15.5}
          zoomControl={false}
          scrollWheelZoom={false}
          className="absolute inset-0 h-full w-full"
        >
          <ZoomControl position="topright" />
          <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
          <Polyline pathOptions={{ color: "#94a3b8", weight: 6, opacity: 0.42 }} positions={effectiveRoute} />
          <Polyline pathOptions={{ color: "#00687a", weight: 4, opacity: 0.95 }} positions={effectiveRoute} />

          {stops.map((stop) => (
            <Marker key={stop.id} position={stop.coordinates} icon={createStopIcon()}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <span className="rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-medium text-[#45464d] shadow-sm">
                  {stop.label}
                </span>
              </Tooltip>
            </Marker>
          ))}

          <Marker position={snappedBusPosition} icon={createBusIcon(busLabel)}>
            <Tooltip direction="top" offset={[0, -16]} opacity={1} permanent={false}>
              <span className="rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-medium text-[#45464d] shadow-sm">
                {routeLabel}
              </span>
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}