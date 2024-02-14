import { Text, StyleSheet, View } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";

const FavoritScreen = () => {
  const favoriteMealIds = useContext(FavoritesContext);
  const favoritMeals = MEALS.filter((item) =>
    favoriteMealIds.ids.includes(item.id)
  );

  if(!favoritMeals.length) {
    return (<View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals !</Text>
    </View>);
  }

  return <MealsList items={favoritMeals} />;
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'center',
        marginTop: 150,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default FavoritScreen;
