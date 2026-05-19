export type ParentNavKey = "dashboard" | "live-track" | "notifications" | "settings";

export interface ParentNavItem {
  key: ParentNavKey;
  label: string;
  href: string;
}

export interface ChildStatus {
  id: string;
  name: string;
  avatarUrl: string;
  statusText: string;
  statusDetail: string;
  timestampLabel: string;
  etaMinutes: number;
  currentStop: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  busLabel: string;
  phoneLabel: string;
}

export type ActivityType = "boarded" | "waiting" | "scan";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  location: string;
  timestamp: string;
}

export interface MapStop {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface ParentDashboardData {
  child: ChildStatus;
  driver: DriverProfile;
  activity: ActivityItem[];
  stops: MapStop[];
  routeLabel: string;
  lastUpdated: string;
}
