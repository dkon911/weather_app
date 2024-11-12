import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const WeatherLineChart = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map((point, index) => `Hour ${index + 1}`), // Customize this if you have specific time labels
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((point) => point.temperature),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Humidity (%)",
        data: data.map((point) => point.humidity),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
      {
        label: "Wind Speed (km/h)",
        data: data.map((point) => point.wind_speed),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Predicted Weather</h2> */}
      <Line data={chartData} />
    </div>
  );
};

export default WeatherLineChart;
