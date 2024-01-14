import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../src/store/favoritesReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FavoriteButton = ({ characterId }) => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = favorites.includes(characterId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(characterId));
    } else {
      dispatch(addFavorite(characterId));
    }
  };

  return (
    <FontAwesomeIcon
      className={`fav-btn ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
      icon={faHeart}
      size='xl'
      onClick={handleToggleFavorite}
    />
  );
};

export default FavoriteButton;