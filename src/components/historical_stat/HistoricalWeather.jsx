import { useEffect, useState } from 'react';
import { fetchHistoricalWeather } from '../../api/historical.js'; // Assuming this is where your fetch function is.
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

const HistoricalWeather = ({ city, country, date }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (historicalData.length === 0) {
    return <div>No historical data available.</div>;
  }

  return (
      <div className="historical-weather-container">
        <h2 className="text-xl font-bold">Historical Weather Data for {city}, {country} on {date}</h2>
        <div className="chart-container">
          {/* Temperature Chart */}
          <h3 className="font-bold mb-4">Temperature and feels-like temperature throughout the day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis
                  dataKey="time"
                  angle={-45}
                  textAnchor="end"
                  tickFormatter={(tick) => moment.utc(tick).format('HH:mm')}
              />
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="temp_c" stroke="#8884d8"/>
              <Line type="monotone" dataKey="feelslike_c" stroke="#82ca9d"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity Chart */}
        <h3 className="font-bold mb-4">Humidity levels throughout the day</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis
                  dataKey="time"
                  angle={-45}
                  textAnchor="end"
                  tickFormatter={(tick) => moment.utc(tick).format('HH:mm')}
              />
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="humidity" stroke="#3498db"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Wind Speed Chart */}
        <h3 className="font-bold mb-4">Wind Speed throughout the day</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis
                  dataKey="time"
                  angle={-45}
                  textAnchor="end"
                  tickFormatter={(tick) => moment.utc(tick).format('HH:mm')}
              />
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="wind_kph" stroke="#e74c3c"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
};

export default HistoricalWeather;
