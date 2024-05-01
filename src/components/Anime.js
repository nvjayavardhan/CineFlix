import React from 'react'
import './Anime.css'
import image from '../images/logo.png';
import searchIcon from '../images/search-Photoroom.png-Photoroom.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Anime({log , setlog}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageno, setPageno] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    const apiKey = '7df67dc3f76c8534357b9da39a1d3afc';

    useEffect(() => {
        try {
            fetch(`https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=${pageno}`)
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Parse the response data as JSON
                    } else {
                        throw new Error('API request failed');
                    }
                })
                .then(data => {
                    setSearchResults(data.data); // Update state with the parsed data
                })
                .catch(error => {
                    console.error('Error fetching movies:', error);
                });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }, [pageno]);


    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const truncateOverview = (synopsis, maxLength) => {
        if (synopsis === null) {
            return '';
        }
        const words = synopsis.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        }
        return synopsis;
    };

    const searchMovies = async () => {
        setPageno(-1);
        try {
            const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            searchMovies();
        }
    };

    const add = () => {
        if (pageno < 500) {
            setPageno(pageno + 5);
            window.scrollTo(0, 0);
        }
    }

    const sub = () => {
        if (pageno > 5) {
            setPageno(pageno - 5);
            window.scrollTo(0, 0);
        }
    }
    return (
        <div className='main'>
            <div className='main1'>
                <nav className="container" style={{ backgroundColor: 'black', height: '50px' }}>
                    <ul className="nav">
                        <Link to='/'>
                            <li className="nav-item">
                                <img src={image} alt='logo' className='im' />
                            </li>
                        </Link>
                        <li className="nav-item" style={{ display: 'flex', flexDirection: 'row' }}>
                            <img src={searchIcon} alt="Search" className="search-icon" />
                            <form onSubmit={handleSubmit}>
                                <input
                                    className='search'
                                    type="text"
                                    placeholder="Search anime"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                <button className='btn1' type="submit">Search</button>
                            </form>
                        </li>
                        {
                            log == 0 ? (
                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "230px" }}>
                                    <li>
                                        <Link to='/signup' className='nav-item'>
                                            <button className='btn2 '>SignUp</button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/login' className='nav-item'>
                                            <button className='btn2 '>Login</button>
                                        </Link>
                                    </li>
                                </div>) :
                                <div>
                                    <li style={{ marginLeft: "230px" }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" className='btn3' style={{ alignContent: "center" }}>
                                                {localStorage.getItem("Username") !== null ? localStorage.getItem("Username").toUpperCase() : null}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Watch List</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Friends</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { localStorage.removeItem("AuthToken"); localStorage.removeItem("username"); setlog(0); }}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                </div>
                        }
                    </ul>
                </nav>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {searchResults.map((movie) => (
                        <Link style={{ textDecoration: "none" }} to={"/card3/" + movie.id} key={movie.id}>
                            <div>
                                <div className="card" style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', height: '600px' }}>
                                    {movie.attributes.posterImage && movie.attributes.posterImage.large &&
                                        <img className="card-img-top" src={movie.attributes.posterImage.large} style={{ width: "278px" }} alt={`${movie.title} Poster`} />
                                    }
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.attributes.titles.en}</h5>
                                        <p className="card-text">{truncateOverview(movie.attributes.synopsis, 20)}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
                {pageno !=-1 ?
                <div className='footer1'>
                    {pageno > 1 ?
                    <div className='page'>
                    <button className='previous' onClick={() => sub()}>Previous</button>
                    </div>:<></>}
                    {pageno < 500 ?
                    <div className='page'>
                    <button className='next' onClick={() => add()}>Next</button>
                    </div>:<></>}
                </div> :<></>}
            </div>
        </div>
    )
}

export default Anime