import { configureStore } from "@reduxjs/toolkit";
import BirthdaySlice from "../store/BirthdaySlice";


const reducer = {
    birthday : BirthdaySlice.reducer
};

const Store = configureStore(
    { reducer },

);

export default Store;