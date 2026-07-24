export type SimulatedSlot = string;
export type AppointmentStatus = 'requested' | 'confirmed' | 'unavailable' | 'cancelled';

export interface Appointment {
  id: string;
  user_id: string;
  simulated_slot: SimulatedSlot;
  status: AppointmentStatus;
  guardian_approved: boolean;
  created_at: string;
  updated_at: string;
}
