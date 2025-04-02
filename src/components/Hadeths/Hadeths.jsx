import { Link } from "react-router-dom"
import './Hadeths.css'
import { FaBookOpen } from "react-icons/fa"
function Hadeths() {
    return (
        <div className='hadeths'>
            <Link to={'/hadeths/Bukhari'}><FaBookOpen/>صحيح البخاري</Link>
            <Link to={'/hadeths/Muslim'}><FaBookOpen />صحيح مسلم</Link>
            <Link to={'/hadeths/Tirmidzi'}><FaBookOpen />سنن الترمذي</Link>
            <Link to={'/hadeths/Nasai'}><FaBookOpen />سنن النسائي</Link>
        </div>
    )
}

export default Hadeths



