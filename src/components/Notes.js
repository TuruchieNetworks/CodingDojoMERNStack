import '../App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Main = (props) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies')
      .then(res => {
        setMovies(res.data)
        console.log('🚀🚀🚀', movies)
      })
      .catch(err => {
        console.log('🔭🎡🎡', err)
      });
  }, []);
  // Pass the delete Idx to the handler with a call back from the onClick 
  const deleteHandler = (deleteIdx) => {
    console.log('🔭🎡🎡 Delete', deleteIdx);
    axios.delete('http://localhost:8000/api/movies/' + deleteIdx)
        .then(res => {
          console.log('🚀🚀🚀', res.data);
          const filteredDeletedMovieList = movies.movies.filter((movie) =>{
            return movie._id !== deleteIdx;
          });
          setMovies(filteredDeletedMovieList);
        })
        .catch(err => {
          console.log('🔭🎡🎡', err)
        });
  }
  return (
    <div>
      <div style={{}}>
        <div>
          {movies ?
            movies.movies.map((movie) => {
              return <div key={movie._id} style={{ fontFamily: 'cursive', color: 'cornflowerblue', background: 'rgba(0,0,0,0.1)'}}>
                {movie.seen ?
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', background: 'black', borderBottom: '1px solid coral', padding: '15px', margin: '0', borderRadius: '7%' }}>

                    <Link to={'/movies/' + movie._id} style={{ textDecoration: 'none', color: 'coral' }}>
                      {movie.title}
                    </Link>
                  </h1> :
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', background: 'black', borderBottom: '1px solid aliceblue', padding: '15px', margin: '0', borderRadius: '7%' }}>

                    <Link to={'/movies/' + movie._id} style={{ textDecoration: 'none', color: 'aquamarine' }}>
                      {movie.title}
                    </Link></h1>
                }
                {/* <img src={movie.image} width='150px'alt={movie.title}/> */}
                <div style={{ background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
                  <p>Released: {movie.releaseYear}</p> 
                  {movie.seen ? 
                  <p style={{ color: 'cornsilk' }}>Watched? Yes 🐱‍🏍</p> : <p style={{ color: 'aquamarine' }}>Watched? No 🤦‍♂️</p>}

                  {movie.seen ?
                    <h1 style={{ borderRadius: '7%', background: 'coral', fontSize: '18px', padding: '15px', width: '100%' }}>
                      <Link to={`/movies/update/${movie._id}`} style={{ textDecoration: 'none', background: 'black', padding: '8px 40px', borderRadius: '7%', color: 'coral', fontWeight: 'bold' }}>Update Movie!</Link>
                    </h1> :
                    <h1 style={{ borderRadius: '7%', background: 'aquamarine', fontSize: '18px', padding: '15px', width: '100%' }}>
                      <Link to={`/movies/update/${movie._id}`} style={{ textDecoration: 'none', background: 'black', padding: '8px 40px', borderRadius: '7%', color: 'aquamarine', fontWeight: 'bold' }}>Update Movie!</Link>
                    </h1>
                  }
                  <button style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', width: '100%', padding: '15px', background: 'rgba(0,0,0,0.7)', borderRadius: '7%', cursor: 'pointer', color: 'ivory' ,marginBottom:'15px'}}onClick={() => deleteHandler(movie._id)}>Delete Movie!</button>
                </div>
              </div>
            }) : <h1>Loading...</h1>
          }
        </div>
      </div>
    </div>
  )
}

export default Main