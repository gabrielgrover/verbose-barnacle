import React from "react";

type Theme = {
  background_color: string;
  text: {
    primary: string;
    secondary?: string;
  };
};

type ThemeContextType = {
  theme: Theme;
  set_theme: (t: Theme) => void;
};

const DEFAULT_THEME = {
  background_color: "black",
  text: {
    primary: "white",
  },
};

export const ThemeProviderContext = React.createContext<ThemeContextType>({
  theme: DEFAULT_THEME,
  set_theme: () => {},
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [theme, set_theme] = React.useState<Theme>(DEFAULT_THEME);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        set_theme,
      }}
    >
      {props.children}
    </ThemeProviderContext.Provider>
  );
};
