import React from 'react';

function Account({ favorites=[] }) {
    console.log(favorites)

    return (
        <div>
          <div className='mt-5 mb-5 flex justify-around items-center'>
            <div className='left-stroke h-2 w-1/3 rounded-xl'></div>
            <div>
              <h1>Hesabım</h1>
            </div>
            <div className='right-stroke h-2 w-1/3 rounded-xl'></div>
          </div>
    
          <div className='Favori container rounded-lg m-auto border-2'>
            <div>
              <h1 className='flex p-3 border-3 justify-center'>Favoriye Eklediginiz Karakterler</h1>
              
              {favorites.length === 0 ? (
                <p className='text-center'>Henüz favorilere eklemiş olduğunuz karakter bulunmuyor.</p>
              ) : (
                <ul>
                  {favorites.map((characterId) => (
                    <li key={characterId}>{characterId}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    }

export default Account;
