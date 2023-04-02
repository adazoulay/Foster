import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const Timer = ({ lastUpdated }) => {
  //   console.log(lastUpdated);
  const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeElapsed() {
    const now = new Date().getTime();
    const lastUpdatedTime = new Date(lastUpdated).getTime();
    const timeDifference = now - lastUpdatedTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return {
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {timeElapsed.hours}h {timeElapsed.minutes}m {timeElapsed.seconds}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 10,
  },
});

export default Timer;
