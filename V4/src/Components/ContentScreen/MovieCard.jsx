import './MovieCard.css'
import PropTypes from "prop-types";

export default function MovieCard({name,year,poster,rating,plot}){

    return(
        <>
            <div className="card">
                <div className="img">
                    <img className='img' src={poster} alt={name + year + 'Poster'} />
                </div>
                <div className="info">
                    <h2 className="movie_name">{name}</h2>
                    <div className="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                            <path
                                d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                                fill="white"/>
                        </svg>
                        <p>{rating}</p>
                    </div>
                    <div className="desc">
                        <p>{plot}</p>
                    </div>
                    <div className='watchlist'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 -960 960 960"
                             fill="#FFFFFF">
                            <path
                                d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                        </svg>
                        <p>Add to WatchList</p>
                    </div>
                </div>
            </div>
        </>
    )
}

MovieCard.propTypes = {
    name: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string,
    rating: PropTypes.string,
    plot: PropTypes.string,
}