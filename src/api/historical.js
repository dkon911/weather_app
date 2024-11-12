import axiosInstance from "../config/axiosConfig";

export const fetchHistoricalWeather = async (city = "", country = "", date = "") => {
  try {
    const response = await axiosInstance.get("/historical_weather", {
      params: {
        city,
        country,
        date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching historical weather data", error);
  }
};
