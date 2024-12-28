import { configureStore } from "@reduxjs/toolkit";
const store =configureStore({
    reducer: {}, // Add your reducers here. For example, { counter: counterReducer }
});
export default store;