import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaCar,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaShare,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Map from "../components/Map";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  // const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };
    const checkIfSaved = async () => {
      try {
        const res = await fetch("/api/savedListing/saved", {
          credentials: "include",
        });
        const savedListings = await res.json();
        if (
          savedListings.some(
            (savedListing) => savedListing._id === params.listingId
          )
        ) {
          setIsSaved(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchListing();
    if (currentUser) {
      checkIfSaved();
    }
  }, [params.listingId, currentUser]);

  const openGoogleMaps = () => {
    if (listing && listing.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        listing.address
      )}`;
      window.open(url, "_blank");
    } else {
      alert("Address is not available.");
    }
  };
  const handleToggleSaveListing = async () => {
    try {
      const url = `/api/savedListing/${isSaved ? "unsave" : "save"}/${
        listing._id
      }`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle saved listing");
      }
      const result = await response.json();
      console.log(result.message);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error(error);
      alert("Error toggling saved listing!");
    }
  };

  return (
    <main className="mt-24">
      {loading && <p className="text-center my-7 text-2xl">Loading..</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper
            navigation
            style={{
              width: "80%", // Adjust width as needed
              maxWidth: "1200px",
              height: "650px", // Optional: Max width for larger screens
              margin: "0 auto", // Center horizontally
              display: "flex", // Flexbox for alignment
              justifyContent: "center", // Center slides within Swiper
            }}
            className="rounded-lg"
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="mt-5 rounded-lg"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:text-xl ">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[-23%] right-[5%] z-10 rounded-mg bg-slate-100 p-2">
              Link Copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 mt-7  gap-4">
            <p className="text-3xl font-semibold font-sans">
              {listing.name} -{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                : listing.regularPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
              {listing.type === "rent" && "/month"}
            </p>
            <p
              className="flex items-center mt-1 gap-2 text-slate-800 font-sans font-semibold text-xl cursor-pointer hover:text-slate-950"
              onClick={openGoogleMaps}
            >
              <FaMapMarkerAlt className="text-green-700 text-2xl" />
              {listing.address}
              <p className="text-sm text-slate-500">
                (click here to view the location and direction to the place)
              </p>
            </p>

            <Map address={listing.address} />

            <br />
            <div className="flex gap-4 text-center">
              <p className="bg-red-900 w-full max-w-[200px] h-[45px] text-white text-center p-2 rounded-md font-medium text-xl">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] h-[45px] text-white text-center p-2 rounded-md font-medium text-xl">
                  ₹{+listing.regularPrice - +listing.discountPrice} Off
                </p>
              )}
            </div>
            <p className="text-slate-800 mt-3">
              <span
                className="font-semibold text-gray-900 text-xl uppercase"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
              >
                Description :{" "}
              </span>
              {listing.description}
            </p>
            <br />
            <p
              className="font-semibold text-gray-900 text-xl uppercase"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Core Amenities :
            </p>
            <ul className=" text-green-900 font-semibold text-sm flex flex-wrapw items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap text-xl">
                <FaBed className="text-3xl" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} bedrooms `
                  : `${listing.bedrooms} bedroom`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-xl">
                <FaBath className="text-3xl" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms `
                  : `${listing.bathrooms} bathroom`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-xl">
                <FaCar className="text-3xl" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-xl">
                <FaChair className="text-3xl" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            <br />
            <p
              className="font-semibold text-gray-900 text-xl uppercase"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Dimensions:
            </p>
            <p className="flex items-center gap-1 whitespace-nowrap text-xl text-green-900 font-semibold">
              <FaRulerCombined className="text-3xl" />
              {listing.squareFeet} <p>sq.ft</p>
            </p>
            <br />
            <div className="flex justify-center mt-4 items-center gap-4">
              <button
                onClick={handleToggleSaveListing}
                className={`flex items-center gap-2 p-2 text-lg rounded-md transition-colors duration-300 ${
                  isSaved ? "bg-red-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                {isSaved ? <FaHeart /> : <FaRegHeart />}
                {isSaved ? "Unsave Listing" : "Save Listing"}
              </button>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    {" "}
                    Contact Landlord
                  </button>
                )}
            </div>
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
