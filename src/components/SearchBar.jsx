// SearchBar.jsx
import React, { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='input'>
      <input type='text' onChange={(e) => setQuery(e.target.value)} placeholder='Aramak İstediginz kelimeyi yazın..' />
      <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
