import { useState } from 'react';
import { useLocationSearch } from '@/hooks/useWeather';
import './CitySearch.css';

function CitySearch({ onCitySelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useLocationSearch(searchQuery);

  const handleCitySelect = (city) => {
    onCitySelect({ lat: city.lat, lon: city.lon });
    setSearchQuery('');
  };

  return (
    <div className="city-search-wrapper">
      <input
        type="text"
        placeholder="Buscar cidade..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="city-search-input"
      />
      
      {searchQuery.length >= 3 && searchResults && (
        <ul className="search-results">
          {searchResults.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onClick={() => handleCitySelect(city)}
              className="search-result-item"
            >
              {city.name}, {city.state}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearch; 