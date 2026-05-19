export interface StatCard {
  id: string;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'red' | 'teal';
}

export interface Bus {
  id: string;
  number: string;
  route: string;
  status: 'active' | 'delayed' | 'inactive';
  position: { x: number; y: number };
  driver: string;
}

export interface Student {
  id: string;
  name: string;
  bus: string;
  route: string;
  timestamp: string;
  status: 'boarded' | 'exited' | 'pending';
  avatar: string;
}

export interface EventLogEntry {
  id: string;
  type: 'boarded' | 'exited' | 'delayed' | 'scan' | 'alert';
  description: string;
  timestamp: string;
}

export interface Driver {
  id: string;
  name: string;
  route: string;
  status: 'online' | 'offline';
  busNumber: string;
  avatar: string;
}
