import { Link } from "react-router-dom"
import './Home.css'
function Home() {
    return (
        <div className="home">
            <Link className="home-link" to={'/quran'}>القرآن الكريم</Link>
            <Link className="home-link" to={'/hadeth'}>أحاديث</Link>
            <Link className="home-link" to={'/azkar'}>أذكار</Link>
        </div>
    )
}

export default Home
