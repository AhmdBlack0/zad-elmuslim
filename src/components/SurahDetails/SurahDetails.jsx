import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SurahDetails.css";
import { HashLoader } from "react-spinners";
import Tafser from "../Tafser/Tafser";

function SurahDetails() {
    const { surahId } = useParams();
    const navigate = useNavigate();

    const [ayahs, setAyahs] = useState([]);
    const [surah, setSurah] = useState(null);
    const [allSurahs, setAllSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fontSize, setFontSize] = useState(25);
    const [ayahTafser, setAyahTafser] = useState(null);
    const [tafserType, setTafserType] = useState("muyassar");

    // Fetch all Surahs
    useEffect(() => {
        axios.get("https://api.alquran.cloud/v1/surah")
            .then(response => setAllSurahs(response.data.data))
            .catch(() => setError("Failed to load Surahs list."));
    }, []);

    // Fetch selected Surah details
    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`https://api.alquran.cloud/v1/surah/${surahId}/ar`)
            .then(response => {
                setAyahs(response.data.data.ayahs);
                setSurah(response.data.data);
            })
            .catch(() => setError("Failed to load Surah. Please try again."))
            .finally(() => setLoading(false));
    }, [surahId]);

    const handleAyahClick = useCallback((ayahNumber) => {
        setAyahTafser(ayahNumber);
    }, []);

    // Navigate to selected Surah
    const handleSurahChange = (event) => {
        navigate(`/${event.target.value}`);
    };

    if (loading) return (
        <div className="loader-container">
            <HashLoader />
        </div>
    );

    if (error) return <p className="error">{error}</p>;

    return (
        <div className="surah-details container">
            <h1 className="surah-details-name">{surah?.name}</h1>

            {/* Font Size Controls */}
            <div className="font-size-settings">
                <button onClick={() => setFontSize((prev) => Math.min(prev + 2, 40))}>+</button>
                <button onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}>-</button>
            </div>

            {/* Surah List Dropdown */}
            <div className="surah-dropdown">
                <label>اختر السورة:</label>
                <select onChange={handleSurahChange} value={surahId}>
                    {allSurahs.map((s) => (
                        <option key={s.number} value={s.number}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Ayah Display */}
            <div className="details-container">
                {ayahs.map((ayah) => (
                    <span 
                        key={ayah.number} 
                        className="ayah" 
                        style={{ fontSize: `${fontSize}px` }} 
                        onClick={() => handleAyahClick(ayah.numberInSurah)}
                    >
                        {ayah.text}
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
