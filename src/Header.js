import React from 'react';
import { useState, useEffect } from 'react';

function Header() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchData() {    
        setLoading(true);        
        
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Network Error');
            const data = await response.json();
            console.log('data rec', data);
            setData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleClick(evt) {
        evt.preventDefault();
        setLoading(true);
        setTimeout(() => {            
            fetchData();
        }, 2000);        
    }

    return (
     <header>
      <h2>Load Stock Data</h2>
      <button onClick={handleClick}>Fetch Data</button>

      {loading && <p>Loading Data...</p>}

      {/* <p>{data ? data.title : 'No Data Loaded'}</p> */}
      {data.map((user) => (
        <p>{user.name}</p>
      ))}
     </header>
    );    
}


export default Header;