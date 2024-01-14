import React from 'react';
import rıckyLogo from '../image/Rick_and_Morty.png';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export const Navbar = ({onSearch}) => {

  return (
    <section className='header-img'>
      <navbar className="p-5">
        <div className='flex justify-between'>
          <img className='' src={rıckyLogo} alt="rıck_and_morty" />
          <ul className='flex justify-around items-center'>
            <li className='me-5'><Link to={"/"}><h1>Tüm Sezonlar</h1></Link></li>
            <li className='me-5'><Link to={"/character/"}><h1>Karakterler</h1></Link></li>
            <li className='me-5'><Link to={"/account"}><h1>Hesabım</h1></Link></li>
          </ul>
        </div>
      </navbar>
      <div className='header-text p-5 flex flex-col-reverse'>
        {/* Navbar içindeki SearchBar'ı kullan */}
        <SearchBar onSearch={onSearch} />
        <h1 >Tüm Sezonlar için dogru adrestesiniz!</h1>
      </div>
    </section>
  );
}
