import { Bus, Student, EventLogEntry, Driver } from '@/types';

export const buses: Bus[] = [
  {
    id: '1',
    number: '12',
    route: 'Hostel',
    status: 'active',
    position: { x: 45, y: 35 },
    driver: 'Ajay Kumar',
    phone: '9876543210',
  },
  {
    id: '2',  
    number: '04',
    route: 'CMF',
    status: 'delayed',
    position: { x: 65, y: 60 },
    driver: 'Rahul Singh',
    phone: '9876543210',
  },
  {
    id: '3',
    number: '08',
    route: 'Main Road',
    status: 'active',
    position: { x: 55, y: 45 },
    driver: 'James Chen',
    phone: '1234567890',
  },
];

export const students: Student[] = [
  {
    id: '1',
    name: 'Aman Verma',
    bus: 'Bus 12',
    route: 'Hostel',
    timestamp: '08:15 AM',
    status: 'boarded',
    avatar: 'AV',
  },
  {
    id: '2',
    name: 'Divanshi Khera',
    bus: 'Bus 04',
    route: 'CMF',
    timestamp: '08:12 AM',
    status: 'exited',
    avatar: 'DK',
  },
  {
    id: '3',
    name: 'Shubh Pathak',
    bus: 'Bus 12',
    route: 'Hostel',
    timestamp: '08:10 AM',
    status: 'boarded',
    avatar: 'SP',
  },
  {
    id: '4',
    name: 'Shivansh Rathore',
    bus: 'Bus 08',
    route: 'Dronagiri Hostel',
    timestamp: '08:05 AM',
    status: 'boarded',
    avatar: 'SR',
  },
  {
    id: '5',
    name: 'Lucas Rodriguez',
    bus: 'Bus 12',
    route: 'Hostel',
    timestamp: '07:58 AM',
    status: 'boarded',
    avatar: 'LR',
  },
];

export const eventLogs: EventLogEntry[] = [
  {
    id: '1',
    type: 'exited',
    description: 'Riya Kapoor exited at Stop 4',
    timestamp: '2m ago',
  },
  {
    id: '2',
    type: 'boarded',
    description: 'Aman Verma boarded Bus 12',
    timestamp: '5m ago',
  },
  {
    id: '3',
    type: 'boarded',
    description: 'Shubh Pathak boarded Bus 12',
    timestamp: '7m ago',
  },
  {
    id: '4',
    type: 'delayed',
    description: 'Bus 08 reported minor traffic delay',
    timestamp: '12m ago',
  },
  {
    id: '5',
    type: 'scan',
    description: 'RFID scan at Main Campus stop',
    timestamp: '14m ago',
  },
  {
    id: '6',
    type: 'alert',
    description: 'Route C experiencing congestion',
    timestamp: '18m ago',
  },
];

export const activeDriver: Driver = {
  id: '1',
  name: 'Amit Shah',
  route: 'Route A - Hostel',
  status: 'online',
  busNumber: 'Bus #12',
  avatar: 'AS',
};
