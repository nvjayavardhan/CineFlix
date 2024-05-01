import React, { useEffect, useState } from 'react'
import './Card.css'
import { useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
function MyVerticallyCenteredModal(props) {
    let [flag,setflag]=useState(0);
    let [content,setContent]=useState('');
    let [date, setdate] = useState('');
    let [review, setreview] = useState('');
    let [star, setstar] = useState('');
    let change = (event) => {
        console.log(event.target.value)
        setdate(event.target.value)
    }
    let change1 = (event) => {
        setreview(event.target.value)
    }
    let change2 = (event) => {
        setstar(event.target.value);
        console.log(event.target.value);
    };
    let submit= async() => {
        if (props.log == 0) {
            const dynamicContent = `<div class="col-sm-12">
      <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
        <i class="start-icon far fa-times-circle faa-pulse animated"></i>
        <strong class="font__weight-semibold">Oh snap!</strong>You aren't logged in
                                    </div>
                                    </div>
  `;
            setContent(dynamicContent);
            return;
        }
        let result=await fetch("http://localhost:5000/api/addfilms",{
            method : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:localStorage.getItem("Username"),movieid:props.id.id,review:review,rating:star,date:date,type:"tvshow"})}

        );
        let res=await result.json();
        if (res.success)
        {
            const dynamicContent=`<div class="col-sm-12" style={{ marginTop: "10px" }}>
            <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                <i class="start-icon far fa-check-circle faa-tada animated"></i>
                <strong class="font__weight-semibold">Well done!</strong> You added review.
            </div>
        </div>`
        setContent(dynamicContent);
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ backgroundColor: "black" }}
        >
            <Modal.Header closeButton>
                <h3>I Watched</h3>
            </Modal.Header>
            <Modal.Body>
                <div className='float-container'>
                    <div className='float-child' style={{ width: "200px" }}>
                        <img src={props.poster} style={{ width: "200px", borderRadius: "7px" }} />
                    </div>
                    <div className='float-child' style={{ marginLeft: "20px" }}>
                        <h4>{props.title}</h4>
                        <div style={{ display: "flex", flexDirection: "row", alignContent: "space-evenly" }}>
                            <h6>Watched on</h6>
                            <input type="date" id="start" value={date} style={{ marginLeft: "10px" }} onChange={change} />
                        </div>
                        <textarea type="text" placeholder="Add a review..." value={review} onChange={change1} style={{ width: "500px", minHeight: "200px", marginTop: "10px" }} />
                        <div style={{ display: "flex", flexDirection: "row", alignContent: "space-evenly" }}>
                            <form class="rating">
                                <label>
                                    <input type="radio" name="stars" value="1" onChange={change2} />
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="2" onChange={change2} />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="3" onChange={change2} />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value='4' onChange={change2} />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="5" onChange={change2} />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                            </form>
                            <button type='submit' className='btn btn-success' style={{ marginLeft: "50px", height: "40px", marginTop: "10px" }} onClick={submit}>Submit</button>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
function Card({log, setlog}) {
    const id = useParams();
    let [movie, setmovie] = useState({})
    let [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/" + id.id + "?api_key=7df67dc3f76c8534357b9da39a1d3afc&language=en-US")
            .then((res) => res.json())
            .then((dat) => {
                setmovie(dat)
                console.log(dat);
            })
            .catch((err) => console.log(err))
    }, [id])
    return (
        <div className="movie">
            <div className="movie_intro">
                <img className="movie_backdrop" src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img className="movie_poster" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} />
                    </div>
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{movie.original_title}</div>
                        <div className="movie_tagline">{movie.tagline}</div>
                        <div className="movie_rating">
                            {movie.vote_average} <i className="fas fa-star" />
                            <span className="movie_voteCount">{"(" + movie.vote_count + ") votes"}</span>
                        </div>
                        <div className="movie_runtime">{movie.runtime + " mins"}</div>
                        <div className="movie_releaseDate">{"Release date: " + movie.release_date}</div>
                        <div className="movie_genres">
                            {
                                movie && movie.genres
                                    ?
                                    movie.genres.map(genre => (
                                        <><span className="movie_genre" id={genre.id}>{genre.name}</span></>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{movie.overview}</div>
                    </div>

                </div>
            </div>
            <div className='backend-links'>
                <button className='btn btn-primary' onClick={() => setModalShow(true)}>Write a review</button>
                <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} poster={"https://image.tmdb.org/t/p/original" + movie.poster_path} title={movie.original_title} id={id} log={log}/>
            </div>
            <div className="movie_links">
                <div className="movie_heading text-white">Useful Links</div>
                {
                    movie && movie.homepage && <a href={movie.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie_homeButton movie_Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    movie && movie.imdb_id && <a href={"https://www.imdb.com/title/" + movie.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie_imdbButton movie_Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie_heading text-white">Production companies</div>
            <div className="movie_production">
                {
                    movie && movie.production_companies && movie.production_companies.map(company => (
                        <>
                            {
                                company.logo_path
                                &&
                                <span className="productionCompanyImage">
                                    <img className="movie_productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Card