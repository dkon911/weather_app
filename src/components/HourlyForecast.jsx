import { Moon } from "lucide-react";
function HourlyForecast({ data }) {
  const hourlyData = data.hour || [];

  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8 overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Today at</h2>
      <div className="flex justify-between min-w-max">
        {hourlyData.map((hour, index) => (
          <div key={index} className="text-center px-4">
            <div className="text-sm text-gray-400 mb-2">
              {new Date(hour.time).getHours()}:00
            </div>
            <Moon size={24} className="mx-auto mb-2" />
            <div className="text-lg font-bold">{hour.temp_c}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HourlyForecast;