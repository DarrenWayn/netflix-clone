import React from 'react'
import requests from '../../api/Requests'
import Banner from '../../components/Banner/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Row from '../../components/Row/Row'
import ProfileScreen from '../ProfileScreen/ProfileScreen'
import { useStateContext } from '../../contexts/StateContextProvider'

import './HomeScreen.css'

const Homescreen = () => {
  const { subscription } = useStateContext()

  return (
    <div className='HomeScreen'>
      {!subscription ? (
        <ProfileScreen />
      ): (
        <>
          <Navbar />
          <Banner />
          <Row
            title='NETFLIX ORIGINALS'
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />
          <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
          <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
          <Row title='Action Movies' fetchUrl={requests.fetchActiosMovies} />
          <Row title='Comedy Movies' fetchUrl={requests.fetchComendyMovies} />
          <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
          <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
          <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
        </>
      )}
    </div>
  )
}

export default Homescreen