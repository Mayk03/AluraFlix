import React, { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritosProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(video, categoryTitle) {
    const existingVideo = favorites.find((fav) => fav.id === video.id);
    if (!existingVideo) {
      setFavorites([
        ...favorites,
        { ...video, categoryTitle, isFavorite: true },
      ]);
    }
  }

  function removeFavorite(videoId) {
    setFavorites(favorites.filter((video) => video.id !== videoId));
  }

  function isFavorite(videoId) {
    return favorites.some((video) => video.id === videoId);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}