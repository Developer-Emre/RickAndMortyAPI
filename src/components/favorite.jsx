import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const FavoriteButton = ({ character, isRemovable = true }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.characters);

  const isFavorite = favorites.some((fav) => fav.id === character.id);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character));
      if (isRemovable) {
        // Sadece çıkarılabilirse, localStorage'dan da kaldır.
        const updatedFavorites = favorites.filter((fav) => fav.id !== character.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <FontAwesomeIcon
      className={`fav-btn ${isFavorite ? 'favorite' : ''}`}
      icon={faHeart}
      size='xl'
      onClick={handleToggleFavorite}
    />
  );
};

export default FavoriteButton;