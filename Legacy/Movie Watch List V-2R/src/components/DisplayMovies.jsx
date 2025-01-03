import React,{ useState } from "react";
import './DisplayMovies.css'

function DisplayMovies(props) {
    console.log("From Props", props)
    const [moviesDataimdbID, setMoviesDataimdbID] = useState([]);
    const localData = []

    if (moviesDataimdbID.length === 0) {
        setMoviesDataimdbID(props.moviesData)
    }
    console.log("IMDB ID's", moviesDataimdbID[0])

    const raw = [];

    moviesDataimdbID.forEach((x) => { (x.map((y) => raw.push(y))) })

    console.log("Raw", raw)

    if (props.moviesData.length != 0) {
        const a = raw.forEach((y) => {
            fetch(`https://www.omdbapi.com/?apikey=a8013152&i=${y}`)
                .then(res => res.json())
                .then(data => {
                    console.log("data", data)
                    localData.push(
                        <div key={data.imdbID}>
                            <div className="movie">
                                <img
                                    src={data.Poster}
                                    alt={`${data.Title} Poster`}
                                />
                                <div className="details">
                                    <div className="title">
                                        <h3>{data.Title}</h3>
                                    </div>
                                    <div className="cat">
                                        <p>{data.Runtime}</p>
                                        <p>{data.Genre}</p>
                                        <label htmlFor={data.imdbID}>
                                            <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 50 50"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM28.125 15.625C28.125 13.8991 26.7259 12.5 25 12.5C23.2741 12.5 21.875 13.8991 21.875 15.625V21.875H15.625C13.8991 21.875 12.5 23.2741 12.5 25C12.5 26.7259 13.8991 28.125 15.625 28.125H21.875V34.375C21.875 36.1009 23.2741 37.5 25 37.5C26.7259 37.5 28.125 36.1009 28.125 34.375V28.125H34.375C36.1009 28.125 37.5 26.7259 37.5 25C37.5 23.2741 36.1009 21.875 34.375 21.875H28.125V15.625Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </label>
                                        <button
                                            id={data.imdbID}
                                            onClick={props.sendtoMovieWatchList}
                                        >
                                            Watchlist
                                        </button>
                                    </div>
                                    <p>{data.Plot}</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                       
                })
        });
        console.log("LocalData", localData)
    }

    if (props.moviesData.length != 0) {
        // console.log("Movies Appended")
        // console.log(props.moviesData)
        // console.log(props.moviesData[0].Search);
        // console.log(props.moviesData[0].Search.imdbID);
        // const m = props.moviesData.map((moviesData) => {
        //     // console.log("Movies Data Inside", moviesData.Search);
        //     return moviesData.Search;
        // })
        // console.log("m",m)

        // const a = m.map((x) => x.map((movie) => movie.imdbID))
        // console.log("a",a[0])
        
        // // setMoviesDataimdbID(a[0])
        // console.log(moviesDataimdbID.length)

        // if (moviesDataimdbID.length === 0) {
        //     setMoviesDataimdbID(a[0])
        //     console.log("Movies Data Already Set")
        // }
        // console.log("moviesDataimdbID", moviesDataimdbID);
        
        // localData = props.moviesData[0].Search.map((moviesData) => {
        
        
        // async function fetchMovieDetailsformID() {
            
        //     // console.log(props.moviesData)
        //     localData = props.moviesData.map((moviesData) => {
        //         // console.log(props.moviesData);
        //         // console.log("Movies Data", moviesData);
        //         fetch(`https://www.omdbapi.com/?apikey=a8013152&i=${moviesData}`)
        //             .then((response) => response.json())
        //             // .then((data) => { setMoviesDataimdbID(prev => [...prev,data]) })
                
        //         return (
        //             <div key={moviesData.imdbID}>
        //                 <div className="movie">
        //                     <img
        //                         src={moviesData.Poster}
        //                         alt={`${moviesData.Title} Poster`}
        //                     />
        //                     <div className="details">
        //                         <div className="title">
        //                             <h3>{moviesData.Title}</h3>
        //                         </div>
        //                         <div className="cat">
        //                             <p>{moviesData.Runtime}</p>
        //                             <p>{moviesData.Genre}</p>
        //                             <label htmlFor={moviesData.imdbID}>
        //                                 <svg
        //                                     width="50"
        //                                     height="50"
        //                                     viewBox="0 0 50 50"
        //                                     fill="none"
        //                                     xmlns="http://www.w3.org/2000/svg"
        //                                 >
        //                                     <path
        //                                         fillRule="evenodd"
        //                                         clipRule="evenodd"
        //                                         d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM28.125 15.625C28.125 13.8991 26.7259 12.5 25 12.5C23.2741 12.5 21.875 13.8991 21.875 15.625V21.875H15.625C13.8991 21.875 12.5 23.2741 12.5 25C12.5 26.7259 13.8991 28.125 15.625 28.125H21.875V34.375C21.875 36.1009 23.2741 37.5 25 37.5C26.7259 37.5 28.125 36.1009 28.125 34.375V28.125H34.375C36.1009 28.125 37.5 26.7259 37.5 25C37.5 23.2741 36.1009 21.875 34.375 21.875H28.125V15.625Z"
        //                                         fill="black"
        //                                     />
        //                                 </svg>
        //                             </label>
        //                             <button
        //                                 id={moviesData.imdbID}
        //                                 onClick={props.sendtoMovieWatchList}
        //                             >
        //                                 Watchlist
        //                             </button>
        //                         </div>
        //                         <p>{moviesData.Plot}</p>
        //                     </div>
        //                 </div>
        //                 <hr />
        //             </div>
        //         );
        //     });

        
            // localData = props.moviesData.map((moviesData) => {
            //     console.log("Movies Data",moviesData.Search)
            //     return (
            //         <div key={moviesData.imdbID}>
            //           <div className="movie">
            //             <img
            //               src={moviesData.Poster}
            //               alt={`${moviesData.Title} Poster`}
            //             />
            //             <div className="details">
            //               <div className="title">
            //                 <h3>{moviesData.Title}</h3>
            //               </div>
            //               <div className="cat">
            //                 <p>{moviesData.Runtime}</p>
            //                 <p>{moviesData.Genre}</p>
            //                 <label htmlFor={moviesData.imdbID}>
            //                   <svg
            //                     width="50"
            //                     height="50"
            //                     viewBox="0 0 50 50"
            //                     fill="none"
            //                     xmlns="http://www.w3.org/2000/svg"
            //                   >
            //                     <path
            //                       fillRule="evenodd"
            //                       clipRule="evenodd"
            //                       d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM28.125 15.625C28.125 13.8991 26.7259 12.5 25 12.5C23.2741 12.5 21.875 13.8991 21.875 15.625V21.875H15.625C13.8991 21.875 12.5 23.2741 12.5 25C12.5 26.7259 13.8991 28.125 15.625 28.125H21.875V34.375C21.875 36.1009 23.2741 37.5 25 37.5C26.7259 37.5 28.125 36.1009 28.125 34.375V28.125H34.375C36.1009 28.125 37.5 26.7259 37.5 25C37.5 23.2741 36.1009 21.875 34.375 21.875H28.125V15.625Z"
            //                       fill="black"
            //                     />
            //                   </svg>
            //                 </label>
            //                 <button
            //                   id={moviesData.imdbID}
            //                   onClick={props.sendtoMovieWatchList}
            //                 >
            //                   Watchlist
            //                 </button>
            //               </div>
            //               <p>{moviesData.Plot}</p>
            //             </div>
            //           </div>
            //           <hr />
            //         </div>
            //     );
            // });
            // console.log("Local Data", localData)
            // setMoviesData(props.moviesData)
        }

        // fetchMovieDetailsformID();
        // console.log("Local Data", localData);
            
        return (
          <>
            {localData}
          </>
        );
    }


export default DisplayMovies;

