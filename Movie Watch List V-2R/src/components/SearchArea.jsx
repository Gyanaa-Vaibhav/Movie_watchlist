import React from "react";
import './SearchArea.css'

function SearchArea(props) {
    // console.log("From Search Area", props.handleclick);

  return (
    <>
      <form className="inputArea">
        <input
          name="name"
          type="text"
          id="searchBar"
          placeholder="Search for a movie"
          value={props.search.name}
          onChange={props.handleclick}
        />

        <select name="type" id="filmType" onChange={props.handleclick}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <button onClick={props.fetchMovie} id="searchBtn">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchArea;