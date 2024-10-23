import { useState } from 'react'
import DisplayMovies from './components/DisplayMovies'
import Nav from './components/Nav'
import SearchArea from './components/SearchArea'
import PlaceHolder from './components/PlacerHolder'
import './App.css'

function App() {
  //Gets the name and other attributes form the Search Bar
  const [search, setSearch] = useState({
    name: "Batman",
    type: "all",
  })

  function listenSearch(e) {
    const {name,value} = e.target
    
    setSearch(prev => ({
      ...prev,
      [name]:value
    }))
  }

  //State to store the movie Watch list
  const [movieWatchList, setMovieWatchList] = useState([])

  function sendtoMovieWatchList(e) {
    const imdbID = e.target.id
    //Data from DisplayMoves to send to the Watch List
    setMovieWatchList((prev) => [...prev, imdbID]);
  }

  console.log("in app")
  console.log("movie Watch List Length",movieWatchList.length)

  return (
    <>
      <Nav />
      <SearchArea handleclick={listenSearch} search={search} />
      {movieWatchList.length === 0 ? (
        <PlaceHolder />
      ) : (
        <DisplayMovies movieName={search.name} sendtoMovieWatchList={sendtoMovieWatchList} />
      )}
      <DisplayMovies movieName={search.name} sendtoMovieWatchList={sendtoMovieWatchList} />
      <DisplayMovies />
    </>
  );
}

export default App
