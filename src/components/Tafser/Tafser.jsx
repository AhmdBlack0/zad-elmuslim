import { useEffect, useState } from "react";
import axios from "axios";
import './Tafser.css'

function Tafser({ surahNumber, ayahNumber, tafserType }) {
    const [tafser, setTafser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!surahNumber || !ayahNumber) return;

        setLoading(true);
        setError(null);

        axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.${tafserType}`)
            .then((response) => {
                setTafser(response.data.data.text);
            })
            .catch((error) => {
                setError("Failed to load Tafsir. Please try again.");
                console.error("Error fetching Tafsir:", error);
            })
            .finally(() => setLoading(false));
    }, [surahNumber, ayahNumber, tafserType]);

    if (error) return <p className="error">{error}</p>;
    if (!tafser) return null;

    return (
        <div className="tafser details-container">
            <p>{tafser}</p>
        </div>
    );
}

export default Tafser;
