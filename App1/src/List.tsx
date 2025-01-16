
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/main.scss';
import axios from 'axios';

interface Item {
  id: number;
  title: string;
  url: string;
}


const List = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites){
      setFavorites(JSON.parse(storedFavorites));
    }else{
      setFavorites([]);
    }
  },[])

  const scrollRef = useRef<HTMLUListElement>(null);

  const fetchData = useCallback(async (page: number) => {
      if(loading) {
        return;
      }
      setLoading(true);
      try{
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
        );
        setItems((prevItem) => [...prevItem, ...response.data])
      } catch (error) {
        console.log('Error fetching data:' , error);
      } finally {
        setLoading(false);
      }

  },[page, loading])

  useEffect(() => {
      fetchData(page);
  },[page])

  const toggleFavorite = (item: Item) => {
    const updatedFavorites = favorites.some(fav => fav.id === item.id) ? favorites.filter(fav => fav.id !== item.id) : [...favorites, item];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleScroll = () => {
    if(!scrollRef.current) return;
    const {clientHeight, scrollTop, scrollHeight} = scrollRef.current as HTMLUListElement;
    if (clientHeight + scrollTop >= scrollHeight - 10 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const debounce = (func:any, delay:number) => {
    let timerOutId: ReturnType<typeof setTimeout>;
    return function(...args: any[]){
      clearTimeout(timerOutId);
      timerOutId = setTimeout(() => {
        func(...args);
      },delay)
    }
  }

  const debouncedHandleScroll = debounce(handleScroll, 1000);


  return (
    <div className="listContainer">
       <h1>
          List of Items   
       </h1>
       <Link to="/">
          <button className='primary-button'>Back to Dashboard</button>
       </Link>
       <div>
          <ul className="scrollContainer" onScroll={debouncedHandleScroll} ref={scrollRef}>
              {items.map((item) => (
                  <li key={item.id}>
                    <img src={item.url} alt={item.title} />
                    <h5>{item.title}</h5>
                    <button onClick={() => toggleFavorite(item)} className='primary-button'>
                      {favorites.some((fav) => fav.id === item.id) ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                  </li>
                ))}
              {loading && <li>Loading ... </li>}
          </ul>
       </div>
    </div>
  );
};

export default List;