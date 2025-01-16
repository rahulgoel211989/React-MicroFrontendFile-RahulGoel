import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/main.scss';

interface Item {
  id: number;
  title: string;
}

const Dashboard = () => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites){
      setFavorites(JSON.parse(storedFavorites));
    }else{
      setFavorites([]);
    }
  },[])

  return (
    <div className="dashboardContainer">
      <p> App1 Dashboard</p>
      <Link to="/List">
        <button className='primary-button'>Go to List Page</button>
      </Link>
      <h2>Favorites:</h2>
      <div className='favorites-container'>
        <ul>
          {favorites.length ? favorites.map((fav) => (
            <li key={fav.id}>
                {fav.title}
            </li>
            )) : "No favorite Item"
          }
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;