import axiosInstance from "../config/axiosConfig";

export const predictWeather = async (city = "") => {
  try {
    const response = await axiosInstance.get("/predict_tomorrow", {
      params: {
        city,
        country: "Vietnam", // Assuming country is fixed to Vietnam
      },
    });
    return response.data.predictions; // Access the predictions directly
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
};
