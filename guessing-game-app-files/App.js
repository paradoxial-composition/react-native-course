import { ImageBackground, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import StartGameScreen from "./screens/StartGameScren";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import Apploading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(1);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) return <Apploading />;

  const pickedNumberHandler = (value) => {
    setUserNumber(value);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  const startewGameHandler = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds(1);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber)
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
        incrementGuessRounds={() => setGuessRounds((value) => parseInt(value) + 1)}
      />
    );
  if (userNumber && gameIsOver)
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startewGameHandler}
      />
    );
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
