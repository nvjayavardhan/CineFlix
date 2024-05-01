import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvShows] = useState([]);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
          params: {
            api_key: '7df67dc3f76c8534357b9da39a1d3afc'
          }
        });
        setMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchTrendingTVShows = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/tv/week', {
          params: {
            api_key: '7df67dc3f76c8534357b9da39a1d3afc'
          }
        });
        setTvShows(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching trending TV shows:', error);
      }
    };
    fetchTrendingTVShows();
  }, []);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await axios.get('https://kitsu.io/api/edge/trending/anime', {});
        setAnime(response.data.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching trending anime:', error);
      }
    };
    fetchTrendingAnime();
  }, []);

  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <div className='box' style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Top 10 Trending Movies</h2>
        {movies.map(props => (
          <div key={props.id} style={{ backgroundColor: 'black', margin: '10px', borderRadius: '10px', padding: '0px', overflow: 'hidden', maxWidth: '340px' }}>
            <img src={`https://image.tmdb.org/t/p/w400/${props.poster_path}`} style={{ marginLeft: '0px', width: '100%' }} alt={props.title} />
            <i style={{ color: 'white' }}><strong>{props.title}</strong></i>
          </div>
        ))}
      </div>
      <div className='box' style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Top 10 Trending TV Shows</h2>
        {tvshows.map(props => (
          <div key={props.id} style={{ backgroundColor: 'black', margin: '10px', borderRadius: '10px', padding: '0px', overflow: 'hidden', maxWidth: '340px' }}>
            <img src={`https://image.tmdb.org/t/p/w400/${props.poster_path}`} style={{ marginLeft: '0px', width: '100%' }} alt={props.name} />
            <i style={{ color: 'white' }}><strong>{props.name}</strong></i>
          </div>
        ))}
      </div>
      <div className='box' style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Top 10 Trending Anime</h2>
        {anime.map(movie => (
          <div key={movie.id} style={{ backgroundColor: 'black', margin: '10px', borderRadius: '10px', padding: '0px', overflow: 'hidden', maxWidth: '340px' }}>
            <img src={movie.attributes.posterImage.large} style={{ marginLeft: '0px', width: '100%' ,height:"508px"}} alt={movie.attributes.titles.en} />
            <i style={{ color: 'white' }}><strong>{movie.attributes.titles.en}</strong></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
