import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../Features/Theme/themeSlice";
import searchReducer from "../Features/Search/Searchslice";
import toggleSidebarReducer from "../Features/ToggleSideBar/ToggleSidebarSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
    toggleSidebar: toggleSidebarReducer,
  },
  devTools: true,
});
