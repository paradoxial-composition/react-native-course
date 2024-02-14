import { View, Text, StyleSheet } from "react-native";

const Subtitles = ({ children }) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: "#e2b497",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  subtitleContainer: {
    borderBottomColor: "#e2b497",
    borderWidth: 2,
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default Subtitles;
