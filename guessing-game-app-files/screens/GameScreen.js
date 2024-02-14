import { View, StyleSheet, Alert, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import { generateRandomBetween } from "../helpers/helpers";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";

let minBoundry = 1;
let maxBoundry = 100;

const GameScreen = ({ userNumber, onGameOver, incrementGuessRounds }) => {
  const initialGuess = generateRandomBetween(
    minBoundry,
    maxBoundry,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const { width } = useWindowDimensions();

  useEffect(() => {
    minBoundry = 1;
    maxBoundry = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver();
  }, [currentGuess]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie !", "You know that this is wrong ...", [
        { text: "...", style: "destructive" },
      ]);
      return;
    }

    direction === "lower"
      ? (maxBoundry = currentGuess - 1)
      : (minBoundry = currentGuess + 1);

    setCurrentGuess(
      generateRandomBetween(minBoundry, maxBoundry, currentGuess)
    );
    incrementGuessRounds();
  };

  let content = (
    <>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower ?
        </InstructionText>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <InstructionText style={styles.instructionText}>
          Higher or Lower ?
        </InstructionText>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
});

export default GameScreen;
