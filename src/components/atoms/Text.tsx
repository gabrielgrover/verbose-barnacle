import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "../../hooks";

type Props = {
  align?: TextStyle["textAlign"];
};

export const T1: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { theme } = useTheme();

  const text_style: TextStyle = {
    ...props,
    color: theme.text.primary,
    textAlign: "left",
  };

  return <Text style={text_style}>{props.children}</Text>;
};
