// store/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StringState {
  username: string;
}

// Initial state
const initialState: StringState = {
  username: '',
};

// Create the slice
const usernameSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
