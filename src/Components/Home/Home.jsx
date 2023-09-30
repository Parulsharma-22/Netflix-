import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"


const apiKey = "c672a721e453b8b156074f63dcf209d6";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming"
const nowplaying = "now_playing"
const popular = "popular"
const toprated = "top_rated"

// card ********************************************
const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

// rows ********************************************
const Row = ({title, arr = [
    // {
      // img: "https://hips.hearstapps.com/hmg-prod/images/best-family-movies-netflix-finding-ohana-64026a8ad1f07.jpeg",
    // }
  ]
}) => (

  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgurl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);




const Home = () => {
  
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [nowplayingMovies, setNowplayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topratedmovies, setTopratedmovies] = useState([])

  useEffect(()=> {

    const fetchUpcoming = async()=>{
    const {data: { results }} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
    setUpcomingMovies(results);

    };

    const fetchNowplaying = async()=>{
    const {data: { results }} = await axios.get(`${url}/movie/${nowplaying}?api_key=${apiKey}`)
    setNowplayingMovies(results);

    };

    const fetchPopularmovies = async()=>{
    const {data: { results }} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
    setPopularMovies(results);

    };

    const fetchToprated = async()=>{
    const {data: { results }} = await axios.get(`${url}/movie/${toprated}?api_key=${apiKey}`)
    setTopratedmovies(results);

    };

    // call fuctions ************
    fetchUpcoming()
    fetchNowplaying()
    fetchPopularmovies()
    fetchToprated()

  }, [])





  return (
    <section className="home">
        <div className="banner" style={{
          backgroundImage: popularMovies[0]
          ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`
          : "rgb(16, 16, 16)"
          }}>

          {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
          {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
    
          <div>
            <button> <BiPlay/>Play </button>
            <button>My List <AiOutlinePlus/> </button>
          </div>
              
        </div>

      <Row title={"Upcoming"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowplayingMovies}/>
      <Row title={"Popular "} arr={popularMovies}/>
      <Row title={"Top Rated"} arr={topratedmovies}/>

    </section>
  );
};

export default Home;
