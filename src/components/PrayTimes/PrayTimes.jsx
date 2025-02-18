import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './PrayTimes.css';
import { MdDarkMode } from "react-icons/md";
import { FaCloudSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";


// Dropdown component for city selection
const Dropdown = ({ isOpen, cities, onCitySelect, closeDropdown }) => {
    if (!isOpen) return null;

    return (
        <div className="dropdown-list">
            {cities.map(city => (
                <div
                    key={city.value}
                    className="dropdown-item"
                    onClick={() => { onCitySelect(city.value); closeDropdown(); }}
                >
                    {city.label}
                </div>
            ))}
        </div>
    );
};

function PrayTimes() {
    const [time, setTimes] = useState({});
    const [city, setCity] = useState('cairo');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const cities = [
        { value: 'cairo', label: 'القاهرة' },
        { value: 'giza', label: 'الجيزة' },
        { value: 'alexandria', label: 'الاسكندرية' },
        { value: 'aswan', label: 'اسوان' }
    ];

    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const response = await axios.get(`http://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`);
                setTimes(response.data.data.timings || {}); // Ensure we don't set undefined timings
            } catch (error) {
                console.error("Error fetching prayer times: ", error);
                alert("There was an error fetching the prayer times.");
            }
        };

        fetchTimes();

        // Cleanup on component unmount
        return () => {
            setTimes({});
        };
    }, [city]);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prevState => !prevState);
    }, []);

    const handleCitySelect = useCallback((city) => {
        setCity(city);
    }, []);

    return (
        <div className="pray-time">
            <div className="custom-select" onClick={toggleDropdown} aria-haspopup="listbox" role="button" aria-expanded={isDropdownOpen}>
                <p>{cities.find(c => c.value === city)?.label || city}</p>
                <span className="arrow">{isDropdownOpen ? "▲" : "▼"}</span>
            </div>
            <Dropdown
                isOpen={isDropdownOpen}
                cities={cities}
                onCitySelect={handleCitySelect}
                closeDropdown={() => setIsDropdownOpen(false)}
            />
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
