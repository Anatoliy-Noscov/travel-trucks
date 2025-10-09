import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '@/types/campers';

interface FavoritesState {
  favorites: Camper[];
  
  // Actions
  addToFavorites: (camper: Camper) => void;
  removeFromFavorites: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;
  toggleFavorite: (camper: Camper) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (camper: Camper) => {
        set((state) => ({
          favorites: [...state.favorites, camper],
        }));
      },

      removeFromFavorites: (camperId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((camper) => camper.id !== camperId),
        }));
      },

      isFavorite: (camperId: string) => {
        return get().favorites.some((camper) => camper.id === camperId);
      },

      toggleFavorite: (camper: Camper) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        
        if (isFavorite(camper.id)) {
          removeFromFavorites(camper.id);
        } else {
          addToFavorites(camper);
        }
      },
    }),
    {
      name: 'favorites-storage', // имя для localStorage
    }
  )
);