import axios from "axios"
import { useEffect, useState } from "react"
import './AllSurah.css'
import { Link } from "react-router-dom";

function AllSurah() {
    const [allSurah, setAllSurah] = useState([]);
    useEffect(() => {
    axios.get("https://api.alquran.cloud/v1/surah")
        .then((response) => {
            setAllSurah(response.data.data)
        })
        .catch((error) => {
            console.log(error)
    })
    }, [])


    return (
        <div className="all-surah container">
            {
                allSurah.map((surah) => {
                    return <Link to={`/${surah.number}`} className="surah" key={surah.number}>
                        <span className="surah-number">{surah.number}</span>
                        <p>{surah.name}</p>
                    </Link>
                })
            }
    </div>
    )
}

export default AllSurah
