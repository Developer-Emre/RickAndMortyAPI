// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    characters: [], // favori karakterleri saklamak için dizi
  },
  reducers: {
    addFavorite: (state, action) => {
      const existingCharacter = state.characters.find(
        (character) => character.id === action.payload.id
      );

      if (!existingCharacter) {
        state.characters.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.characters = state.characters.filter(
        (character) => character.id !== action.payload.id
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
