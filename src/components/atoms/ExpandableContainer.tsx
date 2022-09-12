import React from "react";
import Collapsible from "react-native-collapsible";
import { TouchableOpacity, StyleSheet, View, ViewStyle } from "react-native";

type Props = React.PropsWithChildren<{
  renderMainContent: () => React.ReactNode;
  renderExpandedContent: () => React.ReactNode;
  containerStyle?: ViewStyle;
}>;

export const ExpandableContainer: React.FC<Props> = (props) => {
  const [expanded, set_expanded] = React.useState(false);

  const container_style: ViewStyle = {
    ...styles.container,
    ...props.containerStyle,
  };

  return (
    <View style={container_style}>
      <TouchableOpacity onPress={() => set_expanded((prev) => !prev)}>
        {props.renderMainContent()}
      </TouchableOpacity>
      {/*@ts-ignore*/}
      <Collapsible collapsed={!expanded}>
        {props.renderExpandedContent()}
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
