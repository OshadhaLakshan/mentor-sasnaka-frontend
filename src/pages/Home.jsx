import Banner from '../components/Banner';
import Calendar from '../components/Calendar';
import Feedback from '../components/Feedback';
import FeedbackSection from '../components/FeedbackSection';
import Message from '../components/Message';
import useAuth from "../context/useAuth";

// Swiper Components and Styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import ProfileCard from '../components/ProfileCard';
import { useEffect, useState } from 'react';

const Home = () => {
  const {currentUser} = useAuth()
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    // Sample data
    const feedbacks = [
      { name: "1", img: "1", review: "Awesome!", stars: 4 },
      { name: "2", img: "2", review: "a Great mentor!", stars: 5 },
      { name: "3", img: "3", review: "Very helpful!", stars: 3 },
      { name: "4", img: "4", review: "Fantastic!", stars: 4 },
      { name: "5", img: "5", review: "Helpful!", stars: 5 },
    ];

    // Sample data
    const mentors = [
      { name: "1", img: "1", expertise: "Biological Science", stars: 4 },
      { name: "2", img: "2", expertise: "Physical Science", stars: 5 },
      { name: "3", img: "3", expertise: "Art Stream", stars: 3 },
      { name: "4", img: "4", expertise: "Technology", stars: 4 },
      { name: "5", img: "5", expertise: "Commerce", stars: 5 },
    ];

  return (
    <>
    <div><Banner /></div>
    <div className="bg-gray-400 px-10 py-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
          1180: { slidesPerView: 4, spaceBetween: 50 }, // Show 4 slides at once for wider screens
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {mentors.map((mentor, index) => (
          <SwiperSlide key={index}>
            <ProfileCard
              name={mentor.name}
              img={mentor.img}
              expertise={mentor.expertise}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    {
    !currentUser ? 
    <>
      <div className="bg-gray-300 px-10 py-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
          1180: { slidesPerView: 4, spaceBetween: 50 }, // Show 4 slides at once for wider screens
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <FeedbackSection
              name={feedback.name}
              img={feedback.img}
              review={feedback.review}
              stars={feedback.stars}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </> :
<>
      {isWideScreen ? (
        <div className="bg-gray-300 px-10 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div><Calendar /></div>
          <div><Message /></div>
          <div><Feedback /></div>
        </div>
      ) : (
        <div className="bg-gray-300 md:px-10 md:py-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Calendar />
            </SwiperSlide>
            <SwiperSlide>
              <Message />
            </SwiperSlide>
            <SwiperSlide>
              <Feedback />
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
    }
    </>
  );
};

export default Home;
