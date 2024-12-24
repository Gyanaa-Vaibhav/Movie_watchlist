import React, {useEffect, useState} from "react";
import Nav from "../Nav/Nav.jsx";
import MovieCard from "../ContentScreen/MovieCard.jsx";
import './HighestGrossing.css'

export default function HighestGrossing() {
    const moviesList = [
        'tt0499549',
        'tt4154796',
        'tt1630029',
        'tt0120338',
        'tt2488496',
        'tt4154756',
        'tt10872600',
        'tt22022452',
        'tt0369610',
        'tt6105098',
        'tt0848228',
        'tt2820852',
        'tt1745960',
        'tt4520988',
        'tt1517268',
        'tt2395427',
        'tt6718170',
        'tt1825683',
        'tt1201607',
        'tt6263850',
        'tt2527336',
        'tt4881806',
        'tt2294629',
        'tt2771200',
        'tt3606756',
        'tt4630562',
        'tt1300854',
        'tt2293640',
        'tt3498820',
        'tt1477834',
    ]
    const [loading, setLoading] = React.useState(true);
    const [movieData,setMovieData] = useState([])

    useEffect(()=>{
        async function fetchMovieData() {
            const moviePromises = moviesList.map(async (m) => {
                const res = await fetch(`https://www.omdbapi.com/?apikey=a8013152&i=${m}`);
                const data = await res.json();
                return {
                    name: data.Title,
                    year: data.Year,
                    poster: data.Poster,
                    rating: data.Ratings[0]?.Value || "No Ratings",
                    plot: data.Plot,
                };
            });

            const movies = await Promise.all(moviePromises);
            setMovieData(movies.map(MovieCard));
            setLoading(false);
        }
        fetchMovieData().then(()=>setLoading(false))
    },[])

    if (loading){
        return (
            <>
                <Nav/>
                <div className="loading-screen">
                    <div className="spinner"></div>
                    <p>Loading, please wait...</p>
                </div>
            </>
        )
    }

    return (
        <>
            <Nav/>
                <div className='highest-grossing'>
                    {movieData}
                </div>
        </>
    )
}