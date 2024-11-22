/* eslint-disable react/prop-types */
import { Droplets, Eye, Moon, Sun, Thermometer, Wind, ArrowUp } from "lucide-react";
import HighlightCard from "./HighlightCard";

function getStatusLabel(value, type) {
  if (type === "humidity") {
    if (value < 30) return { label: "Low", color: "bg-blue-500" };
    if (value <= 60) return { label: "Moderate", color: "bg-green-500" };
    return { label: "High", color: "bg-yellow-500" };
  } else if (type === "wind_speed") {
    if (value < 15) return { label: "Calm", color: "bg-green-500" };
    if (value <= 30) return { label: "Breezy", color: "bg-yellow-500" };
    return { label: "Windy", color: "bg-red-500" };
  } else if (type === "visibility") {
    if (value > 10) return { label: "Excellent", color: "bg-green-500" };
    if (value > 5) return { label: "Good", color: "bg-yellow-500" };
    return { label: "Poor", color: "bg-red-500" };
  }
  return { label: "Unknown", color: "bg-gray-500" };
}
function WindDirectionArrow({ degree }) {
  return (
      <div className="relative w-8 h-8">
        <ArrowUp
            size={32}
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
            style={{color: "greenyellow",transform: `rotate(${degree}deg)` }}
        />
      </div>
  );
}

function TodaysHighlights({ data }) {
  const humidityStatus = getStatusLabel(data.humidity, "humidity");
  const windSpeedStatus = getStatusLabel(data.wind_kph, "wind_speed");
  const visibilityStatus = getStatusLabel(data.vis_km, "visibility");

  return (
    <div className="bg-gray-800 text-white rounded-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Today&#39;s Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <HighlightCard
          title="Weather Condition"
          value={data.condition_text}
          icon={
            <img
              src={data.condition_icon}
              alt={data.condition_text}
              className="w-8 h-8"
            />
          }
        />
        <HighlightCard
          title="Humidity"
          value={`${data.humidity}%`}
          icon={<Droplets size={24} />}
        >
          <span
            className={`absolute top-4 right-4 inline-block px-2 py-1 text-xs font-semibold rounded-full ${humidityStatus.color}`}
          >
            {humidityStatus.label}
          </span>
        </HighlightCard>
        <HighlightCard
          title="Pressure"
          value={`${data.pressure_mb} hPa`}
          icon={<Wind size={24} />}
        />
        <HighlightCard
          title="Visibility"
          value={`${data.vis_km} km`}
          icon={<Eye size={24} />}
        >
          <span
            className={`absolute top-4 right-4 inline-block px-2 py-1 text-xs font-semibold rounded-full  ${visibilityStatus.color}`}
          >
            {visibilityStatus.label}
          </span>
        </HighlightCard>
        <HighlightCard
          title="Feels Like"
          value={`${data.feelslike_c}°C`}
          icon={<Thermometer size={24} />}
        />
        <HighlightCard
          title="Wind Speed"
          value={`${data.wind_kph} kph`}
          icon={<Wind size={24} />}
        >
          <span
            className={`absolute top-4 right-4 inline-block px-2 py-1 text-xs font-semibold rounded-full ${windSpeedStatus.color}`}
          >
            {windSpeedStatus.label}
          </span>
        </HighlightCard>
        <HighlightCard
            title="Wind Direction"
            value={`${data.wind_degree}°`}
            icon={<WindDirectionArrow degree={data.wind_degree} />}
        >
          <span className="text-sm text-gray-300">
            {getWindDirection(data.wind_degree)}
          </span>
        </HighlightCard>
        <HighlightCard
          title="Dew Point"
          value={`${data.dewpoint_c}°C`}
          icon={<Thermometer size={24} />}
        />
        <HighlightCard
          title="Gust Speed"
          value={`${data.gust_kph} kph`}
          icon={<Wind size={24} />}
        />
      </div>
    </div>
  );
}
function getWindDirection(degree) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
}
export default TodaysHighlights;
