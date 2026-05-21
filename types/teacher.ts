export type StudentStatus = "present" | "delayed" | "absent" | "on-bus";


export interface Student {
  id: string;
  name: string;
  avatar: string;
  status: StudentStatus;
  eta?: string;
  timeArrived?: string;
  parentNotified?: boolean;
}

export interface TeacherProfile {
  id: string;
  name: string;
  avatar: string;
  classroom: string;
  grade: string;
  school: string;
}

export interface AttendanceStats {
  totalClass: number;
  arrived: number;
  onBus: number;
  absent: number;
}

export interface AlertBanner {
  type: "warning" | "info" | "success";
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}
