import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './Hadeth.css'

function Hadeth() {
  const [hadeths, setHadeths] = useState([]); // تخزين الأحاديث
  const [page, setPage] = useState(0); // تتبع الصفحة الحالية
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [hasMore, setHasMore] = useState(true); // هل هناك المزيد؟
  const lastElementRef = useRef(null); // مرجع لمراقبة آخر عنصر

  useEffect(() => {
    fetchHadiths(); // تحميل أول 100 حديث عند التشغيل
  }, []);

  useEffect(() => {
    if (!loading || !hasMore) return;
    fetchHadiths();
  }, [loading]);

  const fetchHadiths = () => {
    axios
      .get("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json")
      .then((response) => {
        const start = page * 100;
        const end = start + 100;
        const newHadiths = response.data.hadiths.slice(start, end);

        if (newHadiths.length === 0) {
          setHasMore(false); // لا يوجد المزيد للتحميل
        } else {
          setHadeths((prevHadiths) => [...prevHadiths, ...newHadiths]);
          setPage((prevPage) => prevPage + 1);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true);
        }
      },
      { threshold: 1 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => observer.disconnect();
  }, [hadeths, loading, hasMore]);

  return (
    <div className="container details-container">
      <Swiper spaceBetween={50} slidesPerView={1}>
        {hadeths.map((hadeth, index) => (
          <SwiperSlide key={`${hadeth.hadithnumber}-${index}`}>
            <div className="hadeth">
                <p>{hadeth.hadithnumber}- {hadeth.text}</p>
                <p>{hadeth.hadithnumber} من 7563</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={lastElementRef} style={{ height: 50, background: "transparent" }}></div>
    </div>
  );
}

export default Hadeth;
