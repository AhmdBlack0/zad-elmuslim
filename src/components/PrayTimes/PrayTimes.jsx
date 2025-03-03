import { useState, useEffect } from 'react';
import axios from 'axios';
import './PrayTimes.css';



function PrayTimes() {
    const [city, setCity] = useState("cairo");
    const [time, setTime] = useState({});
    useEffect(() => {
        axios.get(`http://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`)
        .then((response) => {
            setTime(response.data.data.timings);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [city])

    return (
        <div className="pray-time">
            <select onChange={(e) => setCity(e.target.value)}>
                <option value="cairo">القاهرة</option>
                <option value="giza">الجيزة</option>
                <option value="alexandria">الاسكندرية</option>
                <option value="aswan">اسوان</option>
            </select>
            <div>
                <div className="pray-time-item">
                    <p>الفجر: {time.Fajr || "00:00"}</p>
                </div>
                <div className="pray-time-item">
                    <p>الشروق: {time.Sunrise || "00:00"}</p>
                </div>
                <div className="pray-time-item">
                    <p>الظهر: {time.Dhuhr || "00:00"}</p>
                </div>
                <div className="pray-time-item">
                    <p>العصر: {time.Asr || "00:00"}</p>
                </div>
                <div className="pray-time-item">
                    <p>المغرب: {time.Maghrib || "00:00"}</p>
                </div>
                <div className="pray-time-item">
                    <p>العشاء: {time.Isha || "00:00"} </p>
                </div>
            </div>
        </div>
    );
}

export default PrayTimes;
