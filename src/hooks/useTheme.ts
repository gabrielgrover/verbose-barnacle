import React from "react";
import { ThemeProviderContext } from "../providers/ThemeProvider";

export const useTheme = () => React.useContext(ThemeProviderContext);
