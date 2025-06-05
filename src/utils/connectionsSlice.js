import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    addConnection: (state, action) => {
      state.push(action.payload);
    },
    removeConnections: () => [],
  },
});

export default connectionsSlice.reducer;
export const { addConnections, addConnection,removeConnections } = connectionsSlice.actions;
