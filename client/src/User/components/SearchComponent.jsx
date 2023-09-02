import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <>
        <div className="d-flex align-items-center justify-content-center search-bar mb-4">
        <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '400px'}}
            className='m-3 p-1'
        />
        <button className='btn btn-dark' onClick={handleSearch}>Search</button>
        </div>
    </>
  );
}

export default SearchComponent;
