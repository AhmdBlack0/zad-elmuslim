import { Route, Routes } from 'react-router-dom'
import './App.css'
import Quran from './components/quran/Quran'
import SurahDetails from './components/SurahDetails/SurahDetails'
import Hadeth from './components/Hadeth/Hadeth'
import Home from './components/Home/Home'
import PrayTimes from './components/PrayTimes/PrayTimes'


function App() {


  return (
    <div className='app'>
      
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/quran' element={<Quran/>} />
        <Route path='/:surahId' element={<SurahDetails />} />
        <Route path='/hadeth' element={<Hadeth />} />
        <Route path='/pray-times' element={<PrayTimes />} />
      </Routes>
    </div>
  )
}

export default App
