import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from '../../api/axios'
import requests from '../../api/Requests'
// import baseURL from '../../api/axios'

const Banner = () => {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      const netflixOriginals = request.data.results
      [
        Math.floor(Math.random() * request.data.results.length - 1)
      ]
      setMovie(netflixOriginals)
      return request
    }
    fetchData()
  }, [])
  
  const truncate = (string, number) => {
      return string?.length > number ? string.substr(0, number - 1) + '...' : string
  }

  return (
    <header className='banner' style={{
        backgroundImage:  `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: 'cover',
        BackgroundPosition: 'center center'
      }}
    >
      <div className='banner__contents'>
        <h1 classNam='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <div className='banner__description'>
          {truncate(movie?.overview, 150)}
        </div>
      </div>

      <div className='banner--fadeBottom' />
    </header>
  )
}

export default Banner