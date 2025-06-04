import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ListingItem from "../components/ListingItem";
import property1 from "../assets/property1.avif";
import property2 from "../assets/property2.jpg";
import property3 from "../assets/property3.jpg";
import property4 from "../assets/property4.png";
import property5 from "../assets/property5.jpg";
import property6 from "../assets/property6.jpg";
import { useRef } from "react";
import Footer from "../components/Footer";

const imagePaths = [
  property1,
  property2,
  property3,
  property4,
  property5,
  property6,
];

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeInSwiper, setFadeInSwiper] = useState(false);
  SwiperCore.use([Navigation, EffectFade]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSellListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSellListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSellListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
    setFadeIn(true);
    setTimeout(() => {
      setFadeInSwiper(true);
    }, 500);
  }, []);

  const fadeInStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
    transition: "opacity 2s ease-out, transform 1s ease-out",
  };

  const fadeInSwiperStyle = {
    opacity: fadeInSwiper ? 1 : 0,
    transform: fadeInSwiper ? "translateX(0)" : "translateX(20px)",
    transition: "opacity 1s ease-out, transform 1s ease-out",
    width: "100%",
    height: "100%",
  };

  const useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [options]);

    return [ref, isIntersecting];
  };

  const [offerRef, isOfferInView] = useIntersectionObserver({ threshold: 0.1 });
  const [rentRef, isRentInView] = useIntersectionObserver({ threshold: 0.1 });
  const [sellRef, isSellInView] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="mt-20" style={{ backgroundColor: "#f0f3f7" }}>
      <style>
        {`
         
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }


          .transition-opacity {
            transition: opacity 1s ease-in-out;
          }
        `}
      </style>
      {/* top */}
      <div
        className=""
        style={{
          background: "linear-gradient(to right, #f0faff, #e0eaff, #d0dfff)",
        }}
      >
        <div
          className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto"
          style={fadeInStyle}
        >
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Find Your next <span className="text-slate-500">perfect</span>{" "}
            <br />
            place with ease{" "}
          </h1>
          <div className="text-gray-600 text-xs sm:text-xl">
            Leo Properties is the best place to find your next perfect place to
            live.
            <br />
            We have a wide range of properties for your to choose from.
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-xl text-blue-700 font-bold hover:underline"
          >
            Let's get Started...
          </Link>
        </div>
      </div>

      {/* swiper */}
      <div style={fadeInSwiperStyle}>
        <Swiper
          effect="fade"
          centeredSlides={true}
          slidesPerView="auto"
          FadeEffectt={{
            crossFade: true,
          }}
          autoplay={{
            delay: 2500, // Change slides every 2 seconds (you can adjust this to 1000 for 1 second)
            disableOnInteraction: false, // Keep autoplay after user interaction
          }}
          speed={600} // Speed of transition effect
          modules={[Autoplay, EffectFade]}
        >
          {imagePaths.length > 0 &&
            imagePaths.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${image}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[600px]"
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* listing result for offer, sell and rent*/}
      <div className="max-w-6xl mx-auto py-3 flex flex-col gap-10 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div
            ref={offerRef}
            style={{
              opacity: isOfferInView ? 1 : 0,
            }}
            className={`transition-opacity ${
              isOfferInView ? "animate-float" : ""
            }`}
          >
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-700">
                  Recent Offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              {/* <div className="flex flex-wrap gap-4"> */}
              <div className="flex gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>{" "}
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div
            ref={rentRef}
            style={{
              opacity: isRentInView ? 1 : 0,
            }}
            className={`transition-opacity ${
              isRentInView ? "animate-float" : ""
            }`}
          >
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-700">
                  Recent places for Rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex  gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}
        {sellListings && sellListings.length > 0 && (
          <div
            ref={sellRef}
            style={{
              opacity: isSellInView ? 1 : 0,
            }}
            className={`transition-opacity ${
              isSellInView ? "animate-float" : ""
            }`}
          >
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-700">
                  Recent places for sell
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sell"}
                >
                  Show more places for sell
                </Link>
              </div>
              <div className="flex  gap-4">
                {sellListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>{" "}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
