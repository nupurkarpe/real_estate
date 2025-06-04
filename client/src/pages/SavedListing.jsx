// SavedListing.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SavedListingItem from "../components/SavedListingItem";
import { FaHeartbeat, FaSave } from "react-icons/fa";

const SavedListing = () => {
  const [savedListings, setSavedListings] = useState([]);

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const res = await axios.get("/api/savedListing/saved", {
          withCredentials: true,
        });
        setSavedListings(res.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching saved listings!");
      }
    };

    fetchSavedListings();
  }, []);

  return (
    <div className="p-4 mt-24">
      <h1 className="text-4xl font-bold text-slate-700 mb-4 text-center pt-7 pb-6">
        Your Favourite Properties
      </h1>
      <div className="flex flex-wrap gap-10 px-20 ">
        {savedListings.map((listing) => (
          <SavedListingItem key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default SavedListing;
