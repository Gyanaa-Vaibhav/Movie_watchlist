const searchBar = document.getElementById("searchBar")
const poster = document.getElementById("poster");
const movieLists = document.getElementById("movieList")
const searchBtn = document.getElementById("searchBtn");
const filmType = document.getElementById("filmType");
const placeHolder = document.getElementById("placeholder");
let moviesData = []
let watchList = []

let x = [1, 2, 3, 4]
console.log(x.length)
console.log(x[0])
console.log(x[1])
console.log(x[2])
console.log(x[3])
console.log(x.includes(5))

// JSON.parse(localStorage.getItem("watchlist"));
if (!(JSON.parse(localStorage.getItem("watchlist")))) {
    let watchList = []
} else {
    watchList = JSON.parse(localStorage.getItem("watchlist"));
}


// Calls the getMovieList Function
searchBtn.addEventListener("click", getMovieList)
// movieListWatchLater.addEventListener('click',renderList(movieListWatchLater,watchList))

//Searches for the given string
async function getMovieList() {
    //Default ULR
    let url = `https://www.omdbapi.com/?apikey=a8013152&s=${searchBar.value}`;

    if (!(filmType.value == "all")) {
      // URL with specified Movie or Series or episode
      url = `https://www.omdbapi.com/?apikey=a8013152&s=${searchBar.value}&type=${filmType.value}`;
    }

    const response = await fetch(url,{referrerPolicy:"unsafe-url"}
    )
    const data = await response.json()
    const x = data.Search
    
    // Resetting the Old data
    moviesData = [];

    // New Array because the present one does not return all the necessary information like time and plot
    x.forEach((a) => moviesData.push(a))

    // Rendering the output
    renderList(movieLists,moviesData)
}


//  Renders the Content
function renderList(list,place) {
    // Reset the movieList DOM
    list.innerHTML = '';

    // Removes the "Start Exploring Page"
    placeHolder.style.display = 'none'

    // Adds the list of movies
    place.forEach((a) => {

        // Gets the Movies using the imdbID
        fetch(`http://www.omdbapi.com/?apikey=a8013152&i=${a.imdbID}`, {
          referrerPolicy: "unsafe-url",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.Ratings[0].Value);

            movieLists.style.display = "grid";
            // Manipulating the DOM
            movieLists.innerHTML += `
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
          });
    })
}


//  Responsible for adding the clicked items to watchlist used whole event
movieLists.addEventListener("click", (e) => {
    console.log(e.target.id)
    const id = e.target.id

    // Gets the button to manipulate change and disable after adding
    const btn = document.getElementById(id)

    // Changes the Plus to tick mark SVG
    btn.previousElementSibling.innerHTML =
    `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
    <path d="M 12 1 C 5.9375 1 1 5.9375 1 12 C 1 18.0625 5.9375 23 12 23 C 18.0625 23 23 18.0625 23 12 C 23 5.9375 18.0625 1 12 1 Z M 12 3 C 16.980469 3 21 7.019531 21 12 C 21 16.980469 16.980469 21 12 21 C 7.019531 21 3 16.980469 3 12 C 3 7.019531 7.019531 3 12 3 Z M 17.40625 8.1875 L 11 14.5625 L 7.71875 11.28125 L 6.28125 12.71875 L 10.28125 16.71875 L 11 17.40625 L 11.71875 16.71875 L 18.8125 9.59375 Z"></path>
    </svg>
    `;
    btn.innerHTML = "Done"
    btn.disabled = true;
    btn.style.cursor = "auto";

    
    // Checks and adds (does not allow duplicates)
    !(watchList.includes(id)) && watchList.push(e.target.id)
    localStorage.setItem("watchlist",JSON.stringify(watchList))
})

// const xz = setInterval(() => {
//         console.log("ok")
//         localStorage.setItem("watchlist2", JSON.stringify(watchList));
//     }, 1000);