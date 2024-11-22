import { Clock, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchWeather } from "./api/weather";
import Header from "./components/Header";
import WeatherApp from "./components/WeatherApp";
import HistoricalWeather from "./components/historical_stat/HistoricalWeather";

const App = () => {
  const [view, setView] = useState("weather");
  const [historicalParams, setHistoricalParams] = useState({
    city: "Hanoi",
    country: "Vietnam",
    date: "2024-06-07",
  });
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Atba Village");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("2024-06-07");
  const [loading, setLoading] = useState(true);

  const getWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeather(city, country);
      setWeatherData(data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleHistoricalWeatherView = () => setView("historical");
  const handleWeatherView = () => setView("weather");

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (view === "weather") {
      getWeather();
    } else {
      setHistoricalParams({
        city: city,
        country: country,
        date: date,
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={handleWeatherView}
              className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ${
                view === "weather"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Sun size={20} />
              <span>Current Weather</span>
            </button>
            <button
              onClick={handleHistoricalWeatherView}
              className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ${
                view === "historical"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Clock size={20} />
              <span>Historical Weather</span>
            </button>
          </div>
        </div>

        <Header
          city={city}
          setCity={setCity}
          handleFilterSubmit={handleFilterSubmit}
        />

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {view === "weather" ? (
            <WeatherApp
              city={city}
              country={country}
              weatherData={weatherData}
              loading={loading}
            />
          ) : (
            <HistoricalWeather
              city={city}
              country={country}
              date={date}
            />)}
        </div>
      </main>
    </div>
  );
};

export default App;
