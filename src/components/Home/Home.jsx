import { Link } from "react-router-dom"
import './Home.css'
import { GiBookCover, GiBookmarklet } from "react-icons/gi"
import { FaPrayingHands } from "react-icons/fa"


function Home() {
    return (
        <div className="home">
            <Link className="home-link" to={'/quran'}><GiBookmarklet />القرآن الكريم</Link>
            <Link className="home-link" to={'/hadeths'}><GiBookCover />أحاديث</Link>
            <Link className="home-link" to={'/azkar'}>أذكار</Link>
            <Link className="home-link" to={'/pray-times'}><FaPrayingHands />مواقيت الصلاة</Link>
        </div>
    )
}

export default Home
