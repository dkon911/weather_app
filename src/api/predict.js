import axiosInstance from "../config/axiosConfig";

export const predictWeather = async (city = "") => {
  try {
    const response = await axiosInstance.get("/predict", {
      params: {
        city,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
};
