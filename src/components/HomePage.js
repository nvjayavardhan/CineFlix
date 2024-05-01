import React from 'react'
import { Link,BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import CineFlix from '../images/Screenshot_2024-02-08_212512.png'
import searchIcon from '../images/search-Photoroom.png-Photoroom.png'
import movieIcon from '../images/result-Photoroom.png-Photoroom.png'
import './HomePage.css'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import Home from './Home.js'
import Movie from './Movie.js';
import TVShow from './TVShow.js';
import Anime from './Anime.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Card from './Card.js';
import Card1 from './Card1.js';
import Card3 from './Card3.js';

function HomePage({log , setlog}) {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<HomePageContent/>} />
        <Route path="/movies" element={<Movie log={log} setlog={setlog}/>}/>
        <Route path="/tvshows" element={<TVShow log={log} setlog={setlog}/>}/>
        <Route path="/anime" element={<Anime log={log} setlog={setlog}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login log={log} setlog={setlog}/>}/>
        <Route path="/card/:id" element={<Card log={log} setlog={setlog} />}/>
        <Route path="/card1/:id" element={<Card1 log={log} setlog={setlog} />}/>
        <Route path="/card3/:id" element={<Card3 log={log} setlog={setlog} />}/>
      </Routes>
    </Router>
  )
}


const HomePageContent =() => {
    let [todos, settodos] = useState('')
    let { register, handleSubmit, formState: { errors } } = useForm();
    let submit = (todoObj) => {
        settodos(todoObj.newTodo);
        console.log(todos);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSubmit(e);
        }
      };
    return (
        <div className='main3'>
            <img className='image' src={CineFlix} alt="CineFlix" />
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home" className='nav-link'> Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movies" className='nav-link'> Movies </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tvshows" className='nav-link'>TV Shows</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/anime" className="nav-link">Anime</Link>
                    </li>
                </ul>
            </nav>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' , marginTop: '30px' }}>
                <div className="search-container">
                <img src={searchIcon} alt="Search" className="search-icon" />
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search..."
                        className="search-input"
                        onKeyPress={handleKeyPress}
                        style={{ width: '300px', height: '40px' }}
                    />
                </div>
            </form>
            <img src={movieIcon} style={{ marginTop: '0px',width: '55%', height: '70%'}} />
        </div>
    );
}

export default HomePage