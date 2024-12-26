// Desc: Fetches the details of the movie from the API
import MovieCard from "../Components/ContentScreen/MovieCard.jsx";

export default function FetchDetails(id){
    const url = `https://www.omdbapi.com/?apikey=a8013152`
    // const[movies,setMovies] = useState([])

    let myPromise = new Promise((resolve, reject) =>{

        resolve(
        fetch(url+'&i='+id)
            .then(res => res.json())
            .then(data => {
                // return data
                return (MovieCard({
                    name:data.Title,
                    year:data.Year,
                    poster:data.Poster,
                    rating:data.Ratings[0].Value,
                    plot:data.Plot,
                }))
            })
        );

        reject("Error");  // when error

    });

    return myPromise
}