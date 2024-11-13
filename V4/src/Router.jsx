import {createBrowserRouter} from "react-router-dom";
import Home from "./Components/Body/Home.jsx";
import MovieScreen from "./Components/ContentScreen/MovieScreen.jsx";

export const Router = createBrowserRouter([
    {path:'/home',element:<Home/>},
    {path:'/',element:<Home/>},
    {path:'/search',element:<MovieScreen/>},
],{
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation:true,
    },
})