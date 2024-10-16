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



// Calls the getMovieList Function
searchBtn.addEventListener("click", getMovieList)

//Searches for the given string
async function getMovieList() {
    //Default ULR
    let url = `http://www.omdbapi.com/?apikey=a8013152&s=${searchBar.value}`;

    if (!(filmType.value == "all")) {
      // URL with specified Movie or Series or episode
      url = `http://www.omdbapi.com/?apikey=a8013152&s=${searchBar.value}&type=${filmType.value}`;
    }

    const response = await fetch(url)
    const data = await response.json()
    const movieList = data.Search
    
    // Resetting the Old data
    moviesData = [];

    // New Array because the present one does not return all the necessary information like time and plot
    movieList.forEach((a) => moviesData.push(a))

    // Rendering the output
    renderList()
}



function renderList() {
    // Reset the movieList DOM
    movieLists.innerHTML = '';

    // Removes the "Start Exploring Page"
    placeHolder.style.display = 'none'

    // Adds the list of movies
    moviesData.forEach((a) => {
        fetch(`http://www.omdbapi.com/?apikey=a8013152&i=${a.imdbID}`)
          .then((response) => response.json())
            .then((data) => {
                console.log(data);
                movieLists.innerHTML +=
                `
                <div class="movie">
                    <img src="${data.Poster}" id="poster" alt="">
                    <div class="details">
                        <h3>${data.Title}</h3>
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


movieLists.addEventListener("click", (e) => {
    const id = e.target.id
    const btn = document.getElementById(id)
    btn.innerHTML = "Done"
    btn.disabled = true;
    btn.style.cursor = "auto";
    !(watchList.includes(id)) && watchList.push(e.target.id)
})
