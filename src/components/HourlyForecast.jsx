import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { predictWeather } from "../api/predict";
import HighlightCard from "./HighlightCard"; // Import HighlightCard component
import WeatherLineChart from "./WeatherLineChart";

function HourlyForecast({ city }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const data = await predictWeather(city); // Call the prediction API
        setHourlyData(data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setError("Could not fetch predictions.");
      }
      setLoading(false);
    };

    if (city) {
      fetchPredictions(); // Fetch predictions when city changes
    }
  }, [city]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8 overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Predicted Weather of {city}</h2>
      {/* <div className="flex flex-wrap justify-between">
        {hourlyData.map((hour, index) => (
          <div key={index} className="w-1/2 sm:w-1/4 lg:w-1/6 p-2">
            <HighlightCard title={`${index + 1}:00`} icon={<Moon size={24} />}>
              <div className="text-lg font-bold">
                {hour.temperature.toFixed(1)}°
              </div>
              <div className="text-sm text-gray-400">{hour.humidity}%</div>
              <div className="text-sm text-gray-400">
                {hour.wind_speed.toFixed(2)} km/h
              </div>
            </HighlightCard>
          </div>
        ))}
      </div> */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
        <WeatherLineChart data={hourlyData} />
      </div>
    </div>
  );
}

export default HourlyForecast;
