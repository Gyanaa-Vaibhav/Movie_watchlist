import {useEffect, useRef, useState} from "react";
import FetchList from "./FetchList.jsx";
import FetchDetails from "./FetchDetails.jsx";
import PropTypes from "prop-types";

export default function RenderCards({data}){

    const [loader,setLoader] = useState(true)
    const{Data} = FetchList(data,setLoader)

    let x = useRef([])

    Data.map(item => {
        FetchDetails(item.imdbID)
            .then(data => {
                x.current.push(data)
            })
            .catch(err => console.log(err))
    })

    useEffect(() => {
        setTimeout(() => {
            console.log("Loader",loader)
            setLoader(false)
        },1000)
    }, []);


    return(
        <>
            {x.current.map(b=>b)}
        </>
    )
}

RenderCards.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            imdbID: PropTypes.string.isRequired
        })
    ).isRequired
};