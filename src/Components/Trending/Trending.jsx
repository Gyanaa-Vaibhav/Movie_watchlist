import React, {useEffect, useState} from "react";
import MovieCard from "../ContentScreen/MovieCard.jsx";
import Nav from "../Nav/Nav.jsx";

export default function Trending() {
    const moviesList = [
        'tt21382296',
        'tt14948432',
        'tt16539454',
        'tt8790086',
        'tt1262426',
        'tt18259086',
        'tt13186482',
        'tt28607951',
        'tt9218128',
        'tt28015403',
        'tt14824600',
        'tt0314331',
        'tt10548174',
        'tt24871974',
        'tt17526714',
        'tt0099785',
        'tt20215234',
        'tt0097958',
        'tt13622970',
        'tt11315808',
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
