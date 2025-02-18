import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Hadeth.css";

function Hadeth() {
  const [hadiths, setHadiths] = useState([]);
  const [page, setPage] = useState(0);
  const observerRef = useRef(null);

  const fetchHadiths = async () => {
    try {
      const { data } = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json`
      );
      setHadiths(data.hadiths.slice(0, (page + 1) * 100));
      setPage((p) => p + 1);
    } catch (error) {
      console.error("Error fetching hadiths:", error);
    }
  };

  useEffect(() => {
    fetchHadiths();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchHadiths();
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hadiths]);

  return (
    <div className="container details-container">
      <Swiper spaceBetween={50} slidesPerView={1}>
        {hadiths.map((h) => (
          <SwiperSlide key={h.hadithnumber}>
            <div className="hadith">
              <p>{h.hadithnumber}- {h.text}</p>
              <p>{h.hadithnumber} من 7563</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={observerRef} style={{ height: 50 }}></div>
    </div>
  );
}

export default Hadeth;
