import type { ParentDashboardData, ParentNavItem } from "@/types/parent";

export const parentNavItems: ParentNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/parents" },
  { key: "live-track", label: "Live Track", href: "/parents/live-track" },
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
    name: "Amit Shah",
    avatarUrl: "https://www.shutterstock.com/image-photo/closeup-indian-bus-driver-happy-260nw-2605532817.jpg",
    rating: 4.9,
    busLabel: "Route B12",
    phoneLabel: "Call Driver",
    phone: "9876543210",
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
    { id: "stop-1", label: "Dronagiri Hostel", coordinates: [28.54580, 77.19096] },
    { id: "stop-2", label: "IITD Hospital", coordinates: [28.545638273204542, 77.188138961792] },
    { id: "stop-3", label: "Cricket Ground IITD", coordinates: [28.544954987200132, 77.18935668468477] },
    { id: "stop-4", label: "Seminar Hall", coordinates: [28.544351806905766, 77.19272017478943] },
    { id: "stop-5", label: "LHC", coordinates: [28.543390481172302, 77.1930742263794] },
  ],
  routeLabel: "Bus B12 - IIT Delhi ",
  lastUpdated: "Last refreshed 1 min ago",
};
