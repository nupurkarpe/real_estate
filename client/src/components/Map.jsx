import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue with Leaflet and Webpack
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ address }) => {
  const [position, setPosition] = useState(null); // Default position

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error("Address not found");
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
      }
    };

    geocodeAddress();
  }, [address]);

  return position ? (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        maxWidth: "600px",
        // margin: "0 auto",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
};

export default Map;
