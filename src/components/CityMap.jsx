// src/components/CityMap.jsx
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CityMap = ({ cities }) => {
  const center = [16.0583, 108.2772]; // Center over Vietnam

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.map((city, index) => (
        <Marker key={index} position={[city.latitude, city.longitude]}>
          <Popup>
            <strong>{city.name}</strong>
            <br />
            Latitude: {city.latitude}
            <br />
            Longitude: {city.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

CityMap.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default CityMap;
