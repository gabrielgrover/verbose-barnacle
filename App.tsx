import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "./src/providers/ThemeProvider";
import { Container as AppContainer } from "./src/components";
import { HomeScreen } from "./src/screens";

export default function App() {
  return (
    <ThemeProvider>
      <AppContainer>
        <StatusBar style="auto" />
        <HomeScreen />
      </AppContainer>
    </ThemeProvider>
  );
}
