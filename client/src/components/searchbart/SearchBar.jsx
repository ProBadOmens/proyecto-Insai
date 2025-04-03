import React, { useState } from 'react';

function SearchBar({ data, onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);
        const filteredData = data.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(value)
            )
        );
        onSearch(filteredData);
    };

    return (
        
            <input
                type="search"
                className="search"
                placeholder="Buscar..."
                value={query}
                onChange={handleSearch}
                title="Buscar"
            />
    );
}

export default SearchBar;