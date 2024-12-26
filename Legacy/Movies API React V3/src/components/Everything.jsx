import React from "react";
import './Everything.css';

function Everything() {

    // Search Bar functionality
    const [search, setSearch] = React.useState({
        name: "",
        isReady: false,
    });
    console.log("Search Status",search.isReady);
    console.log("Search name length",search.name.length)

    // is the input ready to be searched?
    const [ready, setReady] = React.useState(false);
    console.log("Ready Status",ready);
    
    // Taking the imdbID of the movies to render further details
    let imdbId = []

    // MoviesList with imdbID
    const [moviesList, setMoviesList] = React.useState([])
    // console.log(moviesList)

    function style() {
        console.log("In Focus")
        document.getElementById("names").style.display = "block";
    }


    // Fetching data from the API
    React.useEffect(() => {
        if (ready) {
            console.log("Ready Status",ready);
          setReady(false);
          document.getElementById("names").innerHTML = ""
          fetch(`https://www.omdbapi.com/?apikey=a8013152&s=${search.name}`)
              .then((response) => response.json())
            .then((data) => {
              console.log(data);
              data.Search.forEach((a) => {
                console.log(a.Title);
                imdbId.push(a.imdbID);
                document.getElementById("names").innerHTML += `
                    <h2 key=${a.imdbID} id=${a.imdbID}>${a.Title}</h2>
                    `;
                setMoviesList((prev) => imdbId);
              });
            });
        }
}
)

    React.useEffect(() => {
        setTimeout(() => {
            if (moviesList.length > 0 && search.isReady) {
                moviesList.forEach((a) => {
                    // console.log("IN MOVIESLIST ---------")
                    setSearch((a) => ({ ...a, isReady: false }));
                    document.getElementById("movies").innerHTML = '';
                    fetch(`http://www.omdbapi.com/?apikey=a8013152&i=${a}`, {
                        referrerPolicy: "unsafe-url",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            document.getElementById("movies").innerHTML += `
                            <div class="movie">
                                <img src="${data.Poster}" id="poster" alt="">
                                <div class="details">
                                    <div class="title"> 
                                        <h3>${data.Title}</h3> <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg> ${data.Ratings[0].Value}<span>
                                    </div>
                                    <div class="cat">
                                        <p>${data.Runtime}</p>
                                        <p>${data.Genre}</p>
                                        <label for=${data.imdbID}>
                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM28.125 15.625C28.125 13.8991 26.7259 12.5 25 12.5C23.2741 12.5 21.875 13.8991 21.875 15.625V21.875H15.625C13.8991 21.875 12.5 23.2741 12.5 25C12.5 26.7259 13.8991 28.125 15.625 28.125H21.875V34.375C21.875 36.1009 23.2741 37.5 25 37.5C26.7259 37.5 28.125 36.1009 28.125 34.375V28.125H34.375C36.1009 28.125 37.5 26.7259 37.5 25C37.5 23.2741 36.1009 21.875 34.375 21.875H28.125V15.625Z"
                                                fill="black" />
                                            </svg>
                                        </label>
                                        <button id=${data.imdbID}>Watchlist</button>
                                    </div>
                                    <p>${data.Plot}</p>
                                </div>
                            </div>
                            <hr>
                            `;
                        })
                })
            }
        }, 1000)
    })


    return (
      <div>
        <div className="background" />
        <div className="searchBar">
          <input
            onChange={(e) => {
              setSearch((a) => ({ ...a, name: e.target.value }));
              setReady(true);
            }}
            onFocus={style}
            type="text"
            name="name"
            id="movieSearch"
            value={search.name}
          />
          <button
            onClick={() => {
              setReady(true);
              setSearch((a) => ({ ...a, isReady: true }));
              setMoviesList([]);
              document.getElementById("names").style.display = "none";
            }}
            id="searchButton"
          >
            Search
          </button>
          <div
            className="names"
            onClick={(e) =>
              setSearch((prev) => ({ ...prev, name: e.target.textContent }))
            }
            id="names"
          >
          </div>
        </div>
        <div className="movies" id="movies"></div>
      </div>
    );
}

export default Everything;

// ({...a,})