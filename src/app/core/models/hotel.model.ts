export interface HotelConfig {
  name: string;
  claim: string;
  logoInitials: string;
  address: string;
  wifiNetwork: string;
  wifiPassword: string;
  receptionPhone: string;
  schedules: HotelSchedule[];
}

export interface HotelSchedule {
  id: string;
  icon: string;
  name: string;
  hours: string;
  location?: string;
}
