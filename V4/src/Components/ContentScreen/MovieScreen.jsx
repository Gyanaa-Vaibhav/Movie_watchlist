import Nav from "../Nav/Nav.jsx";
import './MovieScreen.css'
import React, {useEffect, useRef, useState} from "react";
import MovieCard from "./MovieCard.jsx";


export default function MovieScreen(){
    const inputRef = useRef()
    const[search,setSearch] = useState('')
    const[isReady,setIsReady] = useState(false)
    const [movieData,setMovieData] = useState([])
    const [loading,setLoading] = useState(false);
    const [moviesNotFound,setMoviesNotFound] = useState(false);
    const [searchList , setSearchList] = useState([])
    const [showSearch,setShowSearch] = useState(false);
    let movieCard = []

    // Fetch to Load the list of movies
    useEffect(() => {
        if(!ready) {
            setSearchList([])
            async function getfetch() {
                const res = await fetch(`https://www.omdbapi.com/?apikey=a8013152&s=${search}&p=1`);
                const data = await res.json();
                if (data.Search) {
                    data.Search.map(d => {
                        const movie = (
                            <div onClick={() => {
                                setSearch(d.Title)
                                setShowSearch(false);
                                setReady(true);
                                setIsReady(true);
                            }} className='search-element' key={d.imdbID}>
                                <h3>{d.Title}</h3>
                                <p>{d.Year} - {d.Type.slice(0, 1).toLocaleUpperCase()}{d.Type.slice(1)}</p>
                            </div>
                        )
                        if (searchList.length < 10) {
                            setSearchList(prev => [movie, ...prev])
                        }
                    })
                }
            }

            if (movieCard.length <= 0 ) {
                getfetch()
                setShowSearch(true);
            }
            if(moviesNotFound === true){
                setShowSearch(false);
            }
        }

    }, [search]);

    // is the input ready to be searched?
    const [ready, setReady] = React.useState(false);

    // Taking the imdbID of the movies to render further details
    let imdbId = []

    // MoviesList with imdbID
    const [moviesList, setMoviesList] = React.useState([])

    // Fetching data from the API
    useEffect(() => {
        setShowSearch(false);
            if (ready) {
                setShowSearch(false);
                setLoading(true);
                setReady(false);
                console.log(search)
                fetch(`https://www.omdbapi.com/?apikey=a8013152&s=${search}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        if(data.Response === "False"){
                            setLoading(false);
                            setMoviesNotFound(true)
                            return
                        }
                        setMoviesNotFound(false)
                        data.Search.forEach(a => {
                            imdbId.push(a.imdbID);
                            setMoviesList(imdbId);
                        });
                    });
            }
        },[ready])

    useEffect(() => {
        setTimeout(() => {
            if (moviesList.length > 0 && isReady) {
                moviesList.forEach((a) => {
                    setIsReady(false);
                    setShowSearch(false);
                    setSearch((a) => ({ ...a, isReady: false }));
                    fetch(`http://www.omdbapi.com/?apikey=a8013152&i=${a}`, {
                        referrerPolicy: "unsafe-url",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            let x = (MovieCard({
                                name:data.Title,
                                year:data.Year,
                                poster:data.Poster,
                                rating:data.Ratings[0].Value,
                                plot:data.Plot,
                            }))
                            movieCard.push(x)
                        })
                })
            }
        }, 1000)
    })

    setTimeout(()=>{
        if(moviesNotFound){
            setMovieData([]);
            setMoviesList([]);
            movieCard = [];
        }
        if (movieCard.length > 0 && !moviesNotFound) {
            setLoading(false);
            setMovieData(movieCard)
            setMoviesNotFound(false);
        }
    },4000)


    return(
        <>
            <Nav/>
            <div onClick={()=> setShowSearch(false)} className='screen'>
                <form className='search'
                      onSubmit={e => {
                          e.preventDefault()
                          setSearch(inputRef.current.value)
                          setReady(true)
                          setShowSearch(false);
                          setIsReady(true)
                      }}
                >
                    <button>
                        <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                             viewBox="0 0 18 18" fill="none">
                            <path
                                d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <input onInput={(e) => {
                        setSearch(e.target.value)
                    }}
                           onClick={()=>setShowSearch(true)}
                           ref={inputRef}
                           type="text"
                           name="movie"
                           id="movie"
                           placeholder='Search for a Movie'
                           autoComplete={'off'}
                    />
                    {showSearch &&
                        <div className='searchList'>{searchList}</div>
                    }
                </form>


                {loading ?
                    <>
                        <div className="loading-screen">
                            <div className="spinner"></div>
                            <p>Loading, please wait...</p>
                        </div>

                    </>
                    : moviesNotFound ?
                        <div className="not-found">
                            <div className="not-found-icon">🎬</div>
                            <p className="not-found-text">No movies found!</p>
                            <p className="not-found-desc">Try searching for something else or explore our
                                collection.</p>
                        </div>
                        : movieData
                }
            </div>
        </>
    )
}
