import axios from "axios";
import { useEffect, useState } from "react";
import "./Hadeth.css";
import { useParams } from "react-router-dom";

function Hadeth() {
  const bookName = useParams().bookName
  const [hadeth, setHadeth] = useState({ items: [] });
  
  useEffect(() => {
    axios
      .get(`https://hadis-api-id.vercel.app/hadith/${(bookName).toLowerCase()}?page=1&limit=100`)
      .then((response) => {
        setHadeth(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [bookName]);

  const BookTitle = () => (
    <h1 className="text-center text-2xl font-bold mb-4">
      {hadeth.name === "Bukhari"
        ? "صحيح البخاري"
        : hadeth.name === "Muslim"
        ? "صحيح مسلم"
        : hadeth.name === "Tirmidzi" ?
        "سنن الترمذي"
        : hadeth.name === "Abu Dawood" ?
        "سنن ابي داود"
        : hadeth.name === "Nasai" ?
        "سنن النسائي"
        : hadeth.name === "Ibn Majah" ?
        "سنن ابن ماجه"
        : ""
      }
    </h1>
  );



  return (
    <div className="hadeth-container">
      <BookTitle />
      <div>
        {
          hadeth.items.map((hadith, index) => (
            <div key={index} className="hadeth-card">
              <strong>{hadith.number} - </strong>
              {hadith.arab}
            </div>
          ))
        }
      </div>
    
    </div>
  );
}

export default Hadeth;