/* eslint-disable react/prop-types */
import { Droplets, Eye, Moon, Sun, Thermometer, Wind } from "lucide-react";
import HighlightCard from "./HighlightCard";

function TodaysHighlights({ data }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Today&#39;s Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <HighlightCard
          title="Air Quality Index"
          value="Good"
          icon={<Wind size={24} />}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>PM2.5: {data.air_quality?.pm2_5 || "N/A"}</div>
            <div>SO2: {data.air_quality?.so2 || "N/A"}</div>
            <div>NO2: {data.air_quality?.no2 || "N/A"}</div>
            <div>O3: {data.air_quality?.o3 || "N/A"}</div>
          </div>
        </HighlightCard>
        <HighlightCard title="Sunrise & Sunset" icon={<Sun size={24} />}>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Sun size={16} className="mr-2" />
              <span>{data.sunrise || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <Moon size={16} className="mr-2" />
              <span>{data.sunset || "N/A"}</span>
            </div>
          </div>
        </HighlightCard>
        <HighlightCard
          title="Humidity"
          value={`${data.humidity}%`}
          icon={<Droplets size={24} />}
        />
        <HighlightCard
          title="Pressure"
          value={`${data.pressure_mb}hPa`}
          icon={<Wind size={24} />}
        />
        <HighlightCard
          title="Visibility"
          value={`${data.vis_km}km`}
          icon={<Eye size={24} />}
        />
        <HighlightCard
          title="Feels Like"
          value={`${data.feelslike_c}°C`}
          icon={<Thermometer size={24} />}
        />
      </div>
    </div>
  );
}
export default TodaysHighlights;
