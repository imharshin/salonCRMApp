import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  config: {
    shopOpenTime: '09:00',
    shopCloseTime: '17:00',
    slotInterval: 30,
  },
  stylists: [
    { id: 's1', name: 'John Doe', color: '#6366f1' },
    { id: 's2', name: 'Jane Smith', color: '#10b981' },
    { id: 's3', name: 'Alex Rivera', color: '#f59e0b' },
    { id: 's4', name: 'Sarah Chen', color: '#ec4899' },
  ],
  appointments: [
    {
      id: 'a1',
      stylistId: 's1',
      clientName: 'Alice',
      service: 'Haircut & Styling',
      start: '2023-10-27T09:00:00',
      end: '2023-10-27T10:30:00',
      status: 'confirmed'
    },
    {
      id: 'a2',
      stylistId: 's2',
      clientName: 'Bob',
      service: 'Beard Trim',
      start: '2023-10-27T10:30:00',
      end: '2023-10-27T11:00:00',
      status: 'pending'
    },
    {
      id: 'a3',
      stylistId: 's1',
      clientName: 'Charlie',
      service: 'Coloring',
      start: '2023-10-27T12:00:00',
      end: '2023-10-27T14:00:00',
      status: 'confirmed'
    }
  ]
};

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    moveAppointment: (state, action) => {
      const { id, stylistId, start, end } = action.payload;
      
      const hasOverlap = state.appointments.some(app => {
        if (app.id === id) return false;
        if (app.stylistId !== stylistId) return false;
        
        const newStart = new Date(start);
        const newEnd = new Date(end);
        const appStart = new Date(app.start);
        const appEnd = new Date(app.end);
        
        return (newStart < appEnd && newEnd > appStart);
      });

      if (!hasOverlap) {
        const index = state.appointments.findIndex(app => app.id === id);
        if (index !== -1) {
          state.appointments[index] = {
            ...state.appointments[index],
            stylistId,
            start,
            end
          };
        }
      }
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.appointments.findIndex(app => app.id === id);
      if (index !== -1) {
        state.appointments[index].status = status;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
    }
  }
});

export const { moveAppointment, updateAppointmentStatus, deleteAppointment } = schedulerSlice.actions;
export default schedulerSlice.reducer;
