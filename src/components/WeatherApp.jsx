import { useState } from "react";
import CityMap from "./CityMap";
import CurrentWeather from "./CurrentWeather";
import TodaysHighlights from "./TodaysHighlights";
import HourlyForecast from "./HourlyForecast";

export default function WeatherApp({ city, country, weatherData, loading }) {
  const [cities, setCities] = useState([
    { name: "Hanoi", latitude: 21.0285, longitude: 105.8542 },
    { name: "Ho Chi Minh City", latitude: 10.7769, longitude: 106.6959 },
    { name: "Da Nang", latitude: 16.0544, longitude: 108.2022 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 mx-auto text-white p-4 px- sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : weatherData && weatherData.length > 0 ? (
          <>
            <div className="lg:col-span-1 space-y-6">
              <CurrentWeather data={weatherData[0]} />
              <CityMap cities={cities} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                <TodaysHighlights data={weatherData[0]} />
                <HourlyForecast city={weatherData[0].name} />
            </div>
          </>
        ) : (
          <div className="col-span-full text-center">
            No weather data available.
          </div>
        )}
      </main>
    </div>
  );
}
