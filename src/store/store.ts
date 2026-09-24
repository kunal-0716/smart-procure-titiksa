import { create } from 'zustand';

// Types
export type FarmerStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'CHANGES_REQUIRED';
export type BookingStatus = 'CONFIRMED' | 'RELEASED' | 'CANCELLED' | 'NO_SHOW' | 'COMPLETED';

export interface Farmer {
  id: string;
  name: string;
  mobile: string;
  maskedAadhaar: string;
  village: string;
  district: string;
  state: string;
  landArea: string;
  crops: string[];
  status: FarmerStatus;
  lastVerifiedDate?: string;
}

export interface Centre {
  id: string;
  name: string;
  location: string;
  capacityPerHour: number;
}

export interface Booking {
  id: string;
  farmerId: string;
  centreId: string;
  crop: string;
  date: string; // YYYY-MM-DD
  timeWindow: string; // e.g. "10:00-11:00"
  expectedQuantity: number;
  status: BookingStatus;
  preAppointmentConfirmed: boolean | null; // null = pending, true = YES, false = NO
}

export interface Receipt {
  id: string;
  bookingId: string;
  farmerId: string;
  centreId: string;
  date: string;
  crop: string;
  expectedQuantity: number;
  actualQuantity: number;
  quality: string;
  pricePerKg: number;
  totalAmount: number;
  paymentStatus: 'PENDING' | 'COMPLETED';
}

export interface Notification {
  id: string;
  farmerId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface AppState {
  farmers: Farmer[];
  centres: Centre[];
  bookings: Booking[];
  receipts: Receipt[];
  notifications: Notification[];
  currentUser: { role: 'FARMER' | 'OFFICER' | 'OPERATOR' | 'ADMIN'; id?: string } | null;
  
  // Actions
  login: (role: 'FARMER' | 'OFFICER' | 'OPERATOR' | 'ADMIN', id?: string) => void;
  logout: () => void;
  updateFarmerDetails: (farmerId: string, updates: Partial<Farmer>) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  confirmPreAppointment: (id: string, confirmed: boolean) => void;
  getAvailableCapacity: (centreId: string, date: string, timeWindow: string) => number;
  markNotificationRead: (id: string) => void;
}

// Initial Data
const initialCentres: Centre[] = [
  { id: 'c1', name: 'Mandi Centre A', location: 'North District', capacityPerHour: 100 },
  { id: 'c2', name: 'Mandi Centre B', location: 'South District', capacityPerHour: 150 },
];

const initialFarmers: Farmer[] = [
  { 
    id: 'f1', name: 'Ramesh Kumar', mobile: '9876543210', maskedAadhaar: 'XXXX-XXXX-1234',
    village: 'Rampur', district: 'North District', state: 'State',
    landArea: '2.5 Hectares', crops: ['Wheat', 'Rice'],
    status: 'VERIFIED', lastVerifiedDate: '2026-08-15'
  },
  { 
    id: 'f2', name: 'Suresh Singh', mobile: '9876543211', maskedAadhaar: 'XXXX-XXXX-5678',
    village: 'Sitapur', district: 'South District', state: 'State',
    landArea: '1.2 Hectares', crops: ['Wheat'],
    status: 'PENDING'
  },
];

const initialBookings: Booking[] = [
  {
    id: 'b1',
    farmerId: 'f2',
    centreId: 'c1',
    crop: 'Wheat',
    date: '2026-09-25',
    timeWindow: '10:00-11:00',
    expectedQuantity: 40,
    status: 'CONFIRMED',
    preAppointmentConfirmed: null,
  },
  {
    id: 'b2',
    farmerId: 'f3', // dummy other farmer
    centreId: 'c1',
    crop: 'Rice',
    date: '2026-09-25',
    timeWindow: '11:00-12:00',
    expectedQuantity: 70,
    status: 'CONFIRMED',
    preAppointmentConfirmed: null,
  }
];

const initialReceipts: Receipt[] = [
  {
    id: 'r1', bookingId: 'b0', farmerId: 'f1', centreId: 'c1',
    date: '2026-09-10', crop: 'Wheat', expectedQuantity: 50, actualQuantity: 48.5,
    quality: 'A', pricePerKg: 25, totalAmount: 1212.5, paymentStatus: 'COMPLETED'
  }
];

const initialNotifications: Notification[] = [
  {
    id: 'n1', farmerId: 'f1', title: 'Verification Successful', 
    message: 'Your profile has been verified by the officer. You can now book procurement slots.', 
    date: '2026-08-15', read: true
  },
  {
    id: 'n2', farmerId: 'f1', title: 'Payment Completed', 
    message: 'Payment of ₹1212.5 for your previous procurement has been credited.', 
    date: '2026-09-12', read: false
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  farmers: initialFarmers,
  centres: initialCentres,
  bookings: initialBookings,
  receipts: initialReceipts,
  notifications: initialNotifications,
  currentUser: null,

  login: (role, id) => set({ currentUser: { role, id } }),
  logout: () => set({ currentUser: null }),
  
  updateFarmerDetails: (farmerId, updates) => set((state) => ({
    farmers: state.farmers.map(f => f.id === farmerId ? { ...f, ...updates, status: 'PENDING' } : f)
  })),

  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
  })),
  
  confirmPreAppointment: (id, confirmed) => set((state) => {
    const newBookings = state.bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          preAppointmentConfirmed: confirmed,
          status: confirmed ? 'CONFIRMED' : 'RELEASED' as BookingStatus
        };
      }
      return b;
    });
    
    // Create a notification for the release
    const notifications = [...state.notifications];
    if (!confirmed) {
      const b = state.bookings.find(x => x.id === id);
      if (b) {
        notifications.push({
          id: `n${Date.now()}`,
          farmerId: b.farmerId,
          title: 'Booking Cancelled',
          message: `${b.expectedQuantity} KG capacity has been released and is now available for other farmers.`,
          date: new Date().toISOString().split('T')[0],
          read: false
        });
      }
    }
    
    return { bookings: newBookings, notifications };
  }),
  
  markNotificationRead: (id) => set(state => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  
  getAvailableCapacity: (centreId, date, timeWindow) => {

    const state = get();
    const centre = state.centres.find(c => c.id === centreId);
    if (!centre) return 0;
    
    const reserved = state.bookings
      .filter(b => b.centreId === centreId && b.date === date && b.timeWindow === timeWindow && b.status === 'CONFIRMED')
      .reduce((sum, b) => sum + b.expectedQuantity, 0);
      
    return Math.max(0, centre.capacityPerHour - reserved);
  }
}));
