import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, loading]);

  const addFavorite = (property) => {
    setFavorites(prev => {
      // Avoid duplicates
      if (prev.some(fav => fav._id === property._id)) {
        return prev;
      }
      return [...prev, { ...property, addedAt: new Date().toISOString() }];
    });
  };

  const removeFavorite = (propertyId) => {
    setFavorites(prev => prev.filter(fav => fav._id !== propertyId));
  };

  const toggleFavorite = (property) => {
    if (isFavorite(property._id)) {
      removeFavorite(property._id);
    } else {
      addFavorite(property);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav._id === propertyId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favCount: favorites.length,
    loading
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;
