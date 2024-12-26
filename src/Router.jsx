import {createBrowserRouter} from "react-router-dom";
import Home from "./Components/Body/Home.jsx";
import MovieScreen from "./Components/ContentScreen/MovieScreen.jsx";
import HighestGrossing from "./Components/Highest Grossing/HighestGrossing.jsx";
import TopRated from "./Components/Top Rated/TopRated.jsx";
import Trending from "./Components/Trending/Trending.jsx";

export const Router = createBrowserRouter([
    {path:'/home',element:<Home/>},
    {path:'/',element:<Home/>},
    {path:'/search',element:<MovieScreen/>},
    {path:'/highest-grossing', element:<HighestGrossing/>},
    {path:'/top-rated', element:<TopRated/>},
    {path:'/trending', element:<Trending/>},
],{
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation:true,
    },
})