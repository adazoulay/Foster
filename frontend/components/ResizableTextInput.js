import React, { useState } from "react";
import { StyleSheet, TextInput, View, PanResponder } from "react-native";

const ResizableTextInput = () => {
  const [text, setText] = useState("");
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(300);

  const handlePanResponderMove = (evt, gestureState) => {
    const newWidth = Math.max(100, gestureState.moveX);
    const newHeight = Math.max(50, gestureState.moveY);
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, { height: height, width: width }]}
        multiline={true}
        onChangeText={setText}
        value={text}
      />
      <View style={styles.handle} {...panResponder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    fontSize: 16,
  },
  handle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: "gray",
    zIndex: 1,
  },
});

export default ResizableTextInput;
