import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice"; //export default userSlice.reducer from userSlice
//name convention for importing a reducer

import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Set the user reducer
    cart: cartReducer,
  },
});

export default store;
