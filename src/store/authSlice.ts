import { createSlice } from '@reduxjs/toolkit';

const mockUsers = [
  {
    id: 'u1',
    name: 'Sarah (Manager)',
    role: 'manager',
    permissions: ['appt.read', 'appt.move', 'appt.create', 'appt.edit', 'appt.cancel', 'staff.read']
  },
  {
    id: 'u2',
    name: 'John (Senior Stylist)',
    role: 'stylist',
    permissions: ['appt.read', 'appt.edit']
  },
  {
    id: 'u3',
    name: 'Jane (Junior Stylist)',
    role: 'stylist',
    permissions: ['appt.read']
  }
];

const initialState = {
  currentUser: mockUsers[0],
  allUsers: mockUsers
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    switchUser: (state, action) => {
      const user = mockUsers.find(u => u.id === action.payload);
      if (user) {
        state.currentUser = user;
      }
    }
  }
});

export const { setUser, switchUser } = authSlice.actions;
export default authSlice.reducer;
