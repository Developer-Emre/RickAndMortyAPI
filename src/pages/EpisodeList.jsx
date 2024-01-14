import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const EpisodeList = () => {
  const [episode, setEpisode] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodePerPage] = useState(8);
  const [filteredEpisode, setFilteredEpisode] = useState([]); // Yeni state

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(res => {
        setEpisode(res.data.results);
        setFilteredEpisode(res.data.results); // Başlangıçta tüm bölümleri göster
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Her arama sorgusu değiştikçe filtreleme işlemi yap
    const filteredResults = episode.filter(
      value =>
        value.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        value.episode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredEpisode(filteredResults);
  }, [searchQuery, episode]);

  const indexOfLastEpisode = currentPage * episodePerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodePerPage;
  const currentEpisode = filteredEpisode.slice(indexOfFirstEpisode, indexOfLastEpisode);

  const totalPages = Math.ceil(filteredEpisode.length / episodePerPage);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <>
      <div className='mt-5 mb-5 flex justify-around items-center'>
        <div className='left-stroke h-2 w-1/3 rounded-xl'></div>
        <div>
          <h1>Tüm Sezonlar</h1>
        </div>
        <div className='right-stroke h-2 w-1/3 rounded-xl'></div>
      </div>

      <div className='flex justify-center'>
        <div className='episode-list mt-5 p-5 grid lg:grid-cols-4 gap-6 w-100'>
          {currentEpisode.map(value => (
            <Link key={value.id} to={`/episodes/${value.id}`} className='episode rounded-lg border-2 p-3 col-span-1'>
              <h2 className='text-3xl'>Id: {value.id}</h2>
              <h2 className='text-3xl'>Name: {value.name}</h2>
              <h2 className='text-3xl'>Episode: {value.episode}</h2>
              <h2 className='text-3xl'>Air_date: {value.air_date}</h2>
            </Link>
          ))}
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
};

export default EpisodeList;



