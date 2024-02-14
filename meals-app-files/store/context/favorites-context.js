import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorites: (id) => {},
  removeFavorits: (id) => {}
});

const FavoritesContextProvider = ({ children }) => {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    const addFavorites = (id) => {
        setFavoriteMealIds( currentFavoriteIds => [...currentFavoriteIds, id]);
    };

    const removeFavorits = (id) => {
        setFavoriteMealIds( currentFavoriteIds => currentFavoriteIds.filter( mealId => mealId !== id));
    };

    const value = {
        ids: favoriteMealIds,
        addFavorites: addFavorites,
        removeFavorits: removeFavorits
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;