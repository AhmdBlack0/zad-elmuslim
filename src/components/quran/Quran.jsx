import AllSurah from "../AllSurah/AllSurah"
import './Quran.css'


function Quran() {

    return (
        <div className="quran-section">
            <h1 className="quran-title">القرآن الكريم</h1>
            <AllSurah />
        </div>
    )
}

export default Quran
