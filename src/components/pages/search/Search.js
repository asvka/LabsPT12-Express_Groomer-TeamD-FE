import React, { useState, useEffect } from 'react';
import GroomerCards from '../GroomerCards/GroomerCards';
import { SearchableMap } from '../Maps';
import { useParams } from 'react-router-dom';
import { getGroomers } from '../../../api';
import './search-styles.scss';

function Search() {
  const { id } = useParams();

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const groomers = await getGroomers({ location_city: search });
      console.log(groomers);
      setData(groomers.data);
    };

    fetchdata();
  }, [search]);

  const updateSearch = e => {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(query);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(query);
    setSearch(query);
    console.log(query);
  };

  return (
    <div className="search-container">
      <div className="map-left">
        <SearchableMap />
      </div>
      <div className="groomers-right">
        <form onSubmit={getSearch} className="searchWrapper">
          <input
            className="searchBar"
            type="text"
            text="Search"
            placeholder="Search for Groomers"
            value={query}
            onChange={updateSearch}
            search={search}
            handleSubmit={getSearch}
          />
          <i id="landing" className="fas fa-caret-left"></i>
          <button type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>

        <GroomerCards key={id} groomers={data} />
      </div>
    </div>
  );
}

export default Search;
