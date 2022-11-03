import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "./cake/cakeSlice";
import icecreamReducer from "./icecream/icecreamSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
  },
});
console.log(store.user);

export default store;
