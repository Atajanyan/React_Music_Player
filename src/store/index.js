import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./songsSlice";

export default configureStore({
    reducer:{
        songs:songsSlice
    }
})
