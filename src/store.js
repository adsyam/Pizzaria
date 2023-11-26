import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice"; //export default userSlice.reducer from userSlice
//name convention for importing a reducer

const store = configureStore({
  reducer: {
    user: userReducer, // Set the user reducer
  },
});

export default store;
