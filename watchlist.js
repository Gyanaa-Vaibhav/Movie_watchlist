const movieLists = document.getElementById("movieList");
const moviesData = JSON.parse(localStorage.getItem('watchlist'))
const placeHolder = document.getElementById("placeholder");
const clearDB = document.getElementById("clear")
// moviesData.forEach((a)=>console.log(a))

// renderList()

if (JSON.parse(localStorage.getItem("watchlist"))) {
    renderList()
}
  function renderList() {
    // Reset the movieList DOM
    movieLists.innerHTML = "";
    placeHolder.style.display = "none";

    // Adds the list of movies
    moviesData.forEach((a) => {
      // Gets the Movies using the imdbID
      console.log(a);
      fetch(`http://www.omdbapi.com/?apikey=a8013152&i=${a}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          movieLists.style.display = "grid";
          // Manipulating the DOM
          movieLists.innerHTML += `
                <div class="movie">
                    <img src="${data.Poster}" id="poster" alt="">
                    <div class="details">
                        <h3>${data.Title}</h3>
                        <div class="cat">
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                        </div>
                        <p>${data.Plot}</p>
                    </div>
                </div>
                <hr>
                `;
        });
    });
  }


clearDB.addEventListener('click', () => {
    localStorage.clear()
    clearDB.style.display = 'none'
    placeHolder.style.display = "flex";
    movieLists.style.display = 'none'
    // renderList();
})