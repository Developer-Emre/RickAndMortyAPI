import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination'


const EpisodeDetail = ({ match }) => {
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);

    const charactersPerPage = 4;


    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/episode/${match.params.id}`)
            .then(res => {
                setEpisode(res.data);

                const characterURLs = res.data.characters;

                Promise.all(characterURLs.map(url => axios.get(url)))
                    .then(characterResponses => {
                        const characterData = characterResponses.map(response => response.data);
                        setCharacters(characterData);
                    })
                    .catch(err => console.log(err));
                setCurrentPage(1);
            })
            .catch(err => console.log(err));


    }, [match.params.id]);

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const totalPages = Math.ceil(characters.length / charactersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    if (!episode) {
        return <Loading />;
    }

    return (
        <div>
            <div className='mt-5'>
                <div className='container m-auto'>
                    <div className='detail-wrap mt-5 p-5'>
                        <h1 className='text-center'>{episode.name}</h1>
                        <h1>Id: {episode.id}</h1>
                        <h1>Air Date: {episode.air_date}</h1>
                        <h1>Episode: {episode.episode}</h1>
                        <h1>Created: {episode.created}</h1>
                    </div>
                </div>
            </div>

            <div className='mt-5 mb-5 flex justify-around items-center'>
                <div className='left-stroke h-2 w-1/3 rounded-xl'></div>
                <div>
                    <h1>Bölüme Ait Karakterler</h1>
                </div>
                <div className='right-stroke h-2 w-1/3 rounded-xl'></div>
            </div>

            <div className='flex justify-center'>
                <div className='character-list mt-5 p-5 grid lg:grid-cols-4 gap-4'>
                    {currentCharacters.map(character => (
                        <div className='characters border-2 p-3 rounded-lg' key={character.id}>
                            <Link key={character.id} to={`/characters/${character.id}`} >
                                <img className='rounded-lg mb-3' src={character.image} alt="" />
                            </Link>

                            <h1 className='max-w-40'>{character.name}</h1>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl'>{character.id}</h2>
                               
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default EpisodeDetail;
