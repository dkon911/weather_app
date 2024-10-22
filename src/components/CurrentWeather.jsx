function CurrentWeather({ data }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Now</h2>
      <div className="flex items-center mb-4 justify-center">
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold mr-4">
          {data.temp_c}°C
        </div>
        <img src={data.condition_icon} alt="" />
        {/* <Moon size={64} className="text-gray-400" /> */}
      </div>
      <div className="text-xl mb-4">{data.condition_text}</div>
      <div className="text-sm text-gray-400">
        Last updated: {data.time_diff} minutes ago
        {/* {new Date(data.last_updated).toLocaleDateString()} */}
      </div>
      <div className="text-sm text-gray-400">
        {data.name}, {data.country}
      </div>
    </div>
  );
}
export default CurrentWeather;
