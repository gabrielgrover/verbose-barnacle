import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../hooks";

type Props = {
  style?: ViewStyle;
};

export const Container: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { theme } = useTheme();

  const container_style: ViewStyle = {
    ...styles.container,
    backgroundColor: theme.background_color,
    ...props.style,
  };

  return <View style={container_style}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
