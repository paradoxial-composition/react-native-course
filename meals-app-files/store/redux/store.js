import { configureStore } from '@reduxjs/toolkit';
import favoritesRedeucer from './favorites';

export const store = configureStore({
    reducer: {
        favoriteMeals : favoritesRedeucer,
    },
})