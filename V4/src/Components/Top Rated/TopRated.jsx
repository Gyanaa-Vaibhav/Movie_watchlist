import React, {useEffect, useState} from "react";
import MovieCard from "../ContentScreen/MovieCard.jsx";
import Nav from "../Nav/Nav.jsx";

export default function TopRated() {
    const moviesList = [
        'tt0111161',
        'tt0068646',
        'tt0468569',
        'tt0071562',
        'tt0050083',
        'tt0167260',
        'tt0108052',
        'tt0110912',
        'tt0120737',
        'tt0060196',
        'tt0109830',
        'tt0167261',
        'tt0137523',
        'tt1375666',
        'tt0080684',
        'tt0133093',
        'tt0099685',
        'tt0073486',
        'tt0816692',
        'tt0114369',
        'tt0038650',
        'tt0047478',
        'tt0102926',
        'tt0120815',
        'tt0317248',
        'tt0120689',
        'tt0118799',
        'tt0103064',
        'tt0076759',
        'tt0088763'
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