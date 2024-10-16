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
      fetch(`https://www.omdbapi.com/?apikey=a8013152&i=${a}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

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