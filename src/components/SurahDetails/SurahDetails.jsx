import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./SurahDetails.css";
import { HashLoader } from "react-spinners";
import Tafser from "../Tafser/Tafser";

function SurahDetails() {
    const { surahId } = useParams();
    const [ayahs, setAyahs] = useState([]);
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fontSize, setFontSize] = useState(25);
    const [ayahTafser, setAyahTafser] = useState(null);
    const [tafserType, setTafserType] = useState("muyassar"); // Default Tafsir

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`https://api.alquran.cloud/v1/surah/${surahId}/ar`)
            .then((response) => {
                setAyahs(response.data.data.ayahs);
                setSurah(response.data.data);
            })
            .catch((error) => {
                setError("Failed to load Surah. Please try again.");
                console.error("Error fetching Surah:", error);
            })
            .finally(() => setLoading(false));
    }, [surahId]);

    const handleAyahClick = useCallback((ayahNumber) => {
        setAyahTafser(ayahNumber);
    }, []);

    if (loading) return (
        <div className="loader-container">
            <HashLoader />
        </div>
    );

    if (error) return <p className="error">{error}</p>;

    return (
        <div className="surah-details container">
            <h1 className="surah-details-name">{surah?.name}</h1>
            
            <div className="font-size-settings">
                <button onClick={() => setFontSize((prev) => Math.min(prev + 2, 40))}>+</button>
                <button onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}>-</button>
            </div>

            <div className="details-container">
                {ayahs.map((ayah) => (
                    <span 
                        key={ayah.number} 
                        className="ayah" 
                        style={{ fontSize: `${fontSize}px` }} 
                        onClick={() => handleAyahClick(ayah.numberInSurah)}
                    >
                        <span>{ayah.text}</span>
                        <span className="ayah-number">({ayah.numberInSurah})</span>
                    </span>
                ))}
            </div>

            {/* Tafsir Selection */}
            <div className="tafser-selection">
                <label>اختر التفسير:</label>
                <select onChange={(e) => setTafserType(e.target.value)} value={tafserType}>
                    <option value="muyassar">التفسير الميسر</option>
                    <option value="qurtubi">تفسير القرطبي</option>
                    <option value="baghawi">تفسير البغوي</option>
                </select>
            </div>

            {/* Render Tafsir if an Ayah is selected */}
            {ayahTafser && <Tafser ayahNumber={ayahTafser} surahNumber={surah.number} tafserType={tafserType} />}
        </div>
    );
}

export default SurahDetails;
