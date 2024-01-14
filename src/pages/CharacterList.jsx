import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(8);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => setCharacters(res.data.results))
      .catch(err => console.log(err));
  }, []);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  if (!characters.length) {
    return <Loading />;
  }

    return (
        <div>
            <div className='mt-5 mb-5 flex justify-around items-center'>
                <div className='left-stroke h-2 w-1/3 rounded-xl'></div>
                <div>
                    <h1>Tüm Karakterler</h1>
                </div>
                <div className='right-stroke h-2 w-1/3 rounded-xl'></div>
            </div>

            <div className='flex justify-center'>
                <div className='character-list mt-5 p-5 grid grid-cols-4 gap-4'>
                    {characters.map(character => (
                        <div className='characters border-2 rounded-lg p-3'>
                        <Link key={character.id} to={`/characters/${character.id}`} >
                            <img className='rounded-lg' src={character.image} alt="" />
                        </Link>

                            <div className='flex items-center justify-between'>
                                <h1 className='max-w-40'>{character.id}</h1>
                                <FontAwesomeIcon className='fav-btn' icon={faHeart} size='xl' />
                            </div>
                            <h1 className='max-w-40'>{character.name}</h1>
                            <h2 className='text-2xl'>Status: {character.status}</h2>
                            <h2 className='text-2xl'>Species: {character.species}</h2>
                            <h2 className='text-2xl'>Type: {character.type}</h2>
                            <h2 className='text-2xl'>Gender: {character.gender}</h2>
                            <h2 className='text-2xl'>Origin: {character.origin.name}</h2>
                            <h2 className='text-2xl'>Location: {character.location.name}</h2>
                            <h2 className='text-2xl'>Created: {character.created}</h2>
                         </div>
                   ))}

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        
                </div>
            </div>
        </div>
    );
};

export default CharacterList;
