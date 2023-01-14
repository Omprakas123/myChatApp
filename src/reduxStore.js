import { configureStore } from "@reduxjs/toolkit";

import myCombinedReducers from "./reducers/index";

const reduxStore = configureStore({
  reducer: myCombinedReducers,
});

export default reduxStore;
