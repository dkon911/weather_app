import axiosInstance from "../config/axiosConfig";

export const fetchWeather = async (city = "", country = "") => {
  try {
    const response = await axiosInstance.get("/weather", {
      params: {
        city,
        country,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
};
