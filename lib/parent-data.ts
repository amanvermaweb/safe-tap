import type { ParentDashboardData, ParentNavItem } from "@/types/parent";

export const parentNavItems: ParentNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/parents" },
  { key: "live-track", label: "Live Track", href: "/parents" },
  { key: "notifications", label: "Notifications", href: "/parents" },
  { key: "settings", label: "Settings", href: "/parents" },
];

export const parentDashboardData: ParentDashboardData = {
  child: {
    id: "child-a-01",
    name: "Aarav Mehta",
    avatarUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=320&q=80",
    statusText: "Boarded safely",
    statusDetail: "Seat 12A confirmed via RFID",
    timestampLabel: "Updated 7:42 AM",
    etaMinutes: 14,
    currentStop: "Approaching Maple Avenue Stop",
  },
  driver: {
    id: "driver-04",
    name: "Daniel Brooks",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=320&q=80",
    rating: 4.9,
    busLabel: "Route B12",
    phoneLabel: "Call Driver",
  },
  activity: [
    {
      id: "activity-01",
      type: "waiting",
      title: "Waiting at stop",
      location: "Maple Avenue",
      timestamp: "7:31 AM",
    },
    {
      id: "activity-02",
      type: "scan",
      title: "RFID card scanned",
      location: "Door scanner - Bus B12",
      timestamp: "7:40 AM",
    },
    {
      id: "activity-03",
      type: "boarded",
      title: "Boarded the bus",
      location: "Front entrance",
      timestamp: "7:41 AM",
    },
  ],
  stops: [
    { id: "stop-1", label: "Willow Street", x: 14, y: 66 },
    { id: "stop-2", label: "Maple Avenue", x: 32, y: 50 },
    { id: "stop-3", label: "Oak Junction", x: 56, y: 44 },
    { id: "stop-4", label: "Riverbank Road", x: 75, y: 36 },
    { id: "stop-5", label: "North Ridge School", x: 88, y: 24 },
  ],
  routeLabel: "Bus B12 - North Ridge School",
  lastUpdated: "Last refreshed 1 min ago",
};
