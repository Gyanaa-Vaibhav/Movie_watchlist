import React ,{ useState } from 'react'
import DisplayMovies from './components/DisplayMovies'
import Nav from './components/Nav'
import SearchArea from './components/SearchArea'
import PlaceHolder from './components/PlacerHolder'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  //Gets the name and other attributes form the Search Bar
  const [search, setSearch] = useState({
    name: "Batman",
    type: "all",
  })

  function listenSearch(e) {
    const {name,value} = e.target
    console.log(name)
    
    setSearch(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const [moviesData, setMoviesData] = useState([]);
  // console.log(moviesData)

  //State to store the movie Watch list
  const [movieWatchList, setMovieWatchList] = useState([])

  function sendtoMovieWatchList(e) {
    const imdbID = e.target.id
    //Data from DisplayMoves to send to the Watch List
    setMovieWatchList((prev) => [...prev, imdbID]);
  }

  // console.log("in app")
  // console.log("movie Watch List Length",movieWatchList.length)
  async function fetchMovie(e) {
    e.preventDefault()
    
    if (search.name === "") { 
      alert("Please enter a movie name")
      return
    } else {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=a8013152&t=${search.name}`
      );
      const data = await res.json();
      console.log("Movie Data", data);
      setMoviesData([data]);
      setMovieWatchList([data])
    }
    }
  
  

  return (
    <>
      <Nav />
      <SearchArea
        fetchMovie={fetchMovie}
        handleclick={listenSearch}
        search={search}
      />
      {movieWatchList.length === 0 ? (
        <PlaceHolder />
      ) : (
        <DisplayMovies
          moviesData={moviesData}
          sendtoMovieWatchList={sendtoMovieWatchList}
        />
      )}
      {/* <DisplayMovies
        moviesData={moviesData}
        movieName={search.name}
        setCount={setCount}
        count={count}
        setMoviesData={setMoviesData}
        sendtoMovieWatchList={sendtoMovieWatchList}
      /> */}
      {/* <DisplayMovies /> */}
    </>
  );
}

export default App
