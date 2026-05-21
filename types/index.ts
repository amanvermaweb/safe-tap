import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  PARENT = 'parent',
  DRIVER = 'driver',
}

export enum StudentStatus {
  HOME = 'home',
  ON_BUS_TO_SCHOOL = 'on_bus_to_school',
  IN_SCHOOL = 'in_school',
  ON_BUS_TO_HOME = 'on_bus_to_home',
}

export enum BusStatus {
  IDLE = 'idle',
  MORNING_TRIP = 'morning_trip',
  SCHOOL_ARRIVED = 'school_arrived',
  AFTERNOON_TRIP = 'afternoon_trip',
}

export enum ScanType {
  BOARD = 'board_bus',
  EXIT = 'exit_bus',
  ENTER_SCHOOL = 'enter_school',
  EXIT_SCHOOL = 'exit_school',
}

export enum TripType {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
}

export enum NotificationType {
  BOARDED = 'boarded_bus',
  REACHED = 'reached_school',
  EXITED = 'exited_school',
  MISSED = 'missed_bus',
}

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export type ObjectId = Types.ObjectId | string;
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
  phone: string;
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
