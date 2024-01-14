import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CharacterDetail = ({ match }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${match.params.id}`)
            .then(res => setCharacter(res.data))
            .catch(err => console.log(err));
    }, [match.params.id]);

    if (!character) {
        return <Loading />;
    }

    return (
        <div>
            <div className='mt-5 '>
                <div className='container m-auto'>
                    <div className='detail-wrap  mt-5 p-5'>
                        <div className='mt-5 mb-5 flex justify-around items-center'>
                            <div className='left-stroke h-2 w-1/3 rounded-xl'></div>
                            <div>
                                <h1 className='text-center'>{character.name}</h1>
                            </div>
                            <div className='right-stroke h-2 w-1/3 rounded-xl'></div>
                        </div>
                        <div className='flex justify-center'>
                        <div className='detail-character border-2 rounded-lg p-5 flex justify-center flex-col w-fit'>
                            <img className='rounded-lg' src={character.image} />
                            <div className='flex items-center justify-between'>
                                        <h1>{character.id}</h1>
                                        <FontAwesomeIcon className='fav-btn' icon={faHeart} size='xl' />
                            </div>
                            <h1>Status: {character.status}</h1>
                            <h1>Species: {character.species}</h1>
                            <h1>Type: {character.type}</h1>
                            <h1>Gender: {character.gender}</h1>
                            <h1>Origin: {character.origin.name}</h1>
                            <h1>Location: {character.location.name}</h1>
                            <h1>Created: {character.created}</h1>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
