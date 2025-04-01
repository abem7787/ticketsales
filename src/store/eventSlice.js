// src/store/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    filteredEvents: [],
    loading: false,
    error: null
  },
  reducers: {
    // Add reducers for events
  }
});

export const { } = eventSlice.actions;
export default eventSlice.reducer;