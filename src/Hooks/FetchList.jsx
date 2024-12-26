import {useEffect, useState} from "react";

export default function FetchList(name){
    const [isLoading,setLoading] = useState(true)
    const [isError,setError] = useState(false)
    const [Data,setData] = useState([])

    const url = `https://www.omdbapi.com/?apikey=a8013152`

    useEffect(() => {
        if(isError) return;

        const fetchData = async () => {
            try {
                const response = await fetch(url+'&s='+name)
                const data = await response.json()
                const sorted = (data.Search.sort((a,b) => (a.Year > b.Year) ? -1 : ((b.Year > a.Year) ? 1 : 0)))
                setData(sorted)
                console.log('Data',sorted)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }


        (async () => {
            await fetchData()
        })()

    }, [name]);

    return {isLoading,isError,Data}
}