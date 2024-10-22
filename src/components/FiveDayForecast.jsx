import { Moon } from "lucide-react";

function FiveDayForecast({ data }) {
  const forecast = data.slice(0, 5);

  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">5 Days Forecast</h2>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Moon size={24} className="text-gray-400" />
              <div>{day.temp_c}°</div>
            </div>
            <div className="text-gray-400">
              {new Date(day.last_updated).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </div>
            <div className="text-gray-400">
              {new Date(day.last_updated).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FiveDayForecast;