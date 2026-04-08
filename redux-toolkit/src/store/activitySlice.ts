import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Activity {
  id: number;
  title: string;
  timestamp: string;
}

interface ActivityState {
  items: Activity[];
}

const initialState: ActivityState = {
  items: [{ id: 1, title: "System Initialized", timestamp: new Date().toLocaleTimeString() }],
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    // Action to add a new activity
    addActivity: (state, action: PayloadAction<string>) => {
      state.items.unshift({
        id: Date.now(),
        title: action.payload,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    // Action to clear the log
    clearLogs: (state) => {
      state.items = [];
    },
  },
});

export const { addActivity, clearLogs } = activitySlice.actions;
export default activitySlice.reducer;