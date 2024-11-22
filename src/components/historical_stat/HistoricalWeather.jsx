import { useEffect, useState } from 'react';
import { fetchHistoricalWeather } from '../../api/historical.js';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import { DatePicker } from './DatePicker';
import StatCard from './StatCard';

const HistoricalWeather = ({ city, country }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('2024-11-20');

  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        setLoading(true);
        const data = await fetchHistoricalWeather(city, country, date);
        setHistoricalData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data", error);
        setLoading(false);
      }
    };

    getHistoricalData();
  }, [city, country, date]);

  if (loading) {
    return <div>Loading historical data...</div>;
  }

  if (!historicalData || historicalData.length === 0) {
    return <div>No historical data available.</div>;
  }



  return (
      <div className="min-h-screen bg-gray-900 mx-auto text-white p-4 px- sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h2 className="text-xl font-bold">Historical Weather Data for {city}, {country} on {date}</h2>
        <div className="flex justify-between mb-6">
          <DatePicker
              selected={date}
              onChange={(selectedDate) => setDate(moment(selectedDate).format('YYYY-MM-DD'))}
          />
        </div>

        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <StatCard
              value={`${historicalData[0]?.avgtemp_c}°C`}
              label={`Temperature on ${date}`}
              getColor={getColorForTemperature}
          />
          <StatCard
              value={`${historicalData[0]?.feelslike_c}°C`}
              label="Feels Like Temperature"
              getColor={getColorForTemperature}
          />
          <StatCard
              value={`${historicalData[0]?.humidity}%`}
              label="Humidity"
              getColor={getColorForHumidity}
          />
          <StatCard
              value={historicalData[0]?.uv}
              label="UV Index"
              getColor={getColorForUV}
          />
          <StatCard
              value={`${historicalData[0]?.precip_mm} mm`}
              label="Precipitation"
              getColor={getColorForPrecipitation}
          />
          <StatCard
              value={`${historicalData[0]?.wind_kph} km/h`}
              label="Average Wind Speed"
              getColor={getColorForWindSpeed}
          />
          <StatCard
              value={`${historicalData[0]?.wind_degree}°`}
              label="Wind Direction"
              getColor={getColorForWindSpeed}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Temperature Line Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Temperature and Feels Like Temperature Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                    dataKey="time"
                    angle={-45}
                    textAnchor="end"
                    tickFormatter={(tick) => moment.utc(tick).format('HH:mm')}
                    stroke="#ccc"
                />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp_c" stroke="#f6ad55" />
                <Line type="monotone" dataKey="feelslike_c" stroke="#fc8181" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity Line Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Humidity Levels Throughout the Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                    dataKey="time"
                    angle={-45}
                    textAnchor="end"
                    tickFormatter={(tick) => moment.utc(tick).format('HH:mm')}
                    stroke="#ccc"
                />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#63b3ed" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Wind Speed Line Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Wind Speed Throughout the Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                    dataKey="time"
                    angle={-45}
                    textAnchor="end"
                    tickFormatter={(tick) => moment.utc(tick).format('HH:mm')}
                    stroke="#ccc"
                />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="wind_kph" stroke="#fc8181" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
  );
}

// Hàm để xác định màu sắc cho nhiệt độ
const getColorForTemperature = (value) => {
  if (value < 17) return 'bg-blue-600'; // Nhiệt độ lạnh
  if (value < 22) return 'bg-green-400'; // Nhiệt độ mát
  if (value < 25) return 'bg-yellow-400'; // Nhiệt độ ấm
  return 'bg-red-500'; // Nhiệt độ nóng
};

// Hàm để xác định màu sắc cho độ ẩm
const getColorForHumidity = (value) => {
  if (value < 30) return 'bg-yellow-200'; // Độ ẩm thấp
  if (value < 60) return 'bg-green-300'; // Độ ẩm trung bình
  return 'bg-blue-500'; // Độ ẩm cao
};

// Hàm để xác định màu sắc cho tốc độ gió
const getColorForWindSpeed = (value) => {
  if (value < 10) return 'bg-green-300'; // Gió nhẹ
  if (value < 30) return 'bg-yellow-400'; // Gió vừa
  return 'bg-red-500'; // Gió mạnh
};

// Hàm để xác định màu sắc cho chỉ số UV
const getColorForUV = (value) => {
  if (value < 3) return 'bg-green-400'; // Chỉ số UV thấp
  if (value < 6) return 'bg-yellow-400'; // Chỉ số UV trung bình
  return 'bg-red-500'; // Chỉ số UV cao
};

// Hàm để xác định màu sắc cho lượng mưa
const getColorForPrecipitation = (value) => {
  if (value === 0) return 'bg-gray-300'; // Không có mưa
  if (value < 10) return 'bg-blue-300'; // Mưa nhẹ
  return 'bg-blue-600'; // Mưa nhiều
};

export default HistoricalWeather;
