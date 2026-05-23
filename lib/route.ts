// Shared route helper: fetch routed points from OSRM and cache results
type Point = [number, number];

const osrmCache = new Map<string, Point[] | null>();

function coordsKey(points: Point[]) {
  return points.map(([lat, lng]) => `${lat},${lng}`).join('|');
}

export async function fetchRoutedPoints(points: Point[]): Promise<Point[] | null> {
  if (!points || points.length < 2) return null;

  const key = coordsKey(points);
  if (osrmCache.has(key)) {
    return osrmCache.get(key) ?? null;
  }

  try {
    const coords = points.map(([lat, lng]) => `${lng},${lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('OSRM request failed');
    const data = await res.json();
    const geo = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;

    if (!geo || !Array.isArray(geo) || geo.length === 0) {
      osrmCache.set(key, null);
      return null;
    }

    // convert [lng, lat] -> [lat, lng]
    const routed = geo.map(([lng, lat]) => [lat, lng] as Point);
    osrmCache.set(key, routed);
    return routed;
  } catch (err) {
    osrmCache.set(key, null);
    return null;
  }
}

export function clearRouteCache() {
  osrmCache.clear();
}
