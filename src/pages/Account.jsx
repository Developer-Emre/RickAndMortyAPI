import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

function Account({ favorites = [] }) {
  const dispatch = useDispatch();
  const [localStorageFavorites, setLocalStorageFavorites] = React.useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setLocalStorageFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (characterId) => {
    dispatch(removeFavorite({ id: characterId }));
    // localStorage'dan da kaldıralım
    const updatedFavorites = localStorageFavorites.filter((character) => character.id !== characterId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setLocalStorageFavorites(updatedFavorites);
  };

  return (
    <div>
      <div className='Favori container rounded-lg m-auto border-2'>
        <div>
          <h1 className='flex p-3 border-3 justify-center'>Favoriye Eklediginiz Karakterler</h1>

          {localStorageFavorites.length === 0 ? (
            <h1 className='text-center'>Henüz favorilere eklemiş oldugunuz karakter bulunmuyor.</h1>
          ) : (
            <div className='flex justify-center'>
              <div className='character-list mt-5 p-5 grid lg:grid-cols-4 gap-4'>
                {localStorageFavorites.map((character) => (
                  <div className='characters border-2 p-3 rounded-lg' key={character.id}>
                    <img className='rounded-lg mb-3' src={character.image} alt="" />
                    <h1 className='max-w-40'>{character.name}</h1>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-2xl'>{character.id}</h2>
                      <button onClick={() => handleRemoveFavorite(character.id)}>Remove Favorite</button>
                    </div>
                    <h2 className='text-2xl'>Status: {character.status}</h2>
                    <h2 className='text-2xl'>Species: {character.species}</h2>
                    <h2 className='text-2xl'>Type: {character.type}</h2>
                    <h2 className='text-2xl'>Gender: {character.gender}</h2>
                    <h2 className='text-2xl'>Origin: {character.origin.name}</h2>
                    <h2 className='text-2xl'>Location: {character.location.name}</h2>
                    <h2 className='text-2xl'>Created: {character.created}</h2>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
