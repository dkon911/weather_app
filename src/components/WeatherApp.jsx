import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";
import CurrentWeather from "./CurrentWeather";
import FiveDayForecast from "./FiveDayForecast";
import GeographyChart from "./GeographyChart"; // Import the Geo Chart
import HourlyForecast from "./HourlyForecast";
import TodaysHighlights from "./TodaysHighlights";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeather(city, country);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className="min-h-screen bg-gray-900 mx-auto text-white p-4 px- sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 md:mb-10 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Weather forecast
          </h1>
        </div>
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        >
          <div className="relative w-full sm:w-64 md:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Search city..."
              className="w-full bg-gray-800 rounded-full py-2 px-4 pr-10"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Search
          </button>
        </form>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : weatherData ? (
          <>
            <div className="lg:col-span-1 space-y-6">
              <CurrentWeather data={weatherData[0]} />
              <FiveDayForecast data={weatherData} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <TodaysHighlights data={weatherData[0]} />
              <HourlyForecast data={weatherData[0]} />
              <GeographyChart data={weatherData} /> {/* Add the Geo Chart */}
            </div>
          </>
        ) : (
          <div className="col-span-full text-center">
            No weather data available
          </div>
        )}
      </main>
    </div>
  );
}
