// import React,{ useState } from 'react'
import './App.css'
import {RouterProvider} from "react-router-dom";
import {Router} from "./Router.jsx";

function App() {
  return (
    <>
        <RouterProvider
            future={{
                v7_startTransition: true,
            }}
            router={Router}
        />
    </>
  )
}

export default App
