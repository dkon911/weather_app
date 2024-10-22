import { ResponsiveChoropleth } from "@nivo/geo";
import worldGeojson from "../data/countries.geo.json";

const GeographyChart = ({ data }) => {
  // Transform weather data to the format expected by ResponsiveChoropleth
  const chartData = data.map((location) => ({
    id: location.name, // This is used to identify each location on the map
    value: location.temp_c, // You can change this to any value you want to represent on the map
    lat: location.lat,
    lon: location.lon,
  }));

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveChoropleth
        data={chartData}
        features={worldGeojson.features} // The world map data
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[0, 40]} // Adjust the temperature range or whatever value you are using
        unknownColor="#666666"
        label="properties.name"
        projectionScale={700}
        projectionTranslation={[-1.4, 0.9]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.5}
        borderColor="#fff"
        // legends={[
        //   {
        //     anchor: "bottom-left",
        //     direction: "column",
        //     justify: true,
        //     translateX: 20,
        //     translateY: -100,
        //     itemsSpacing: 0,
        //     itemWidth: 94,
        //     itemHeight: 18,
        //     itemDirection: "left-to-right",
        //     itemTextColor: "#ffffff",
        //     itemOpacity: 0.85,
        //     symbolSize: 18,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: "#ffffff",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        theme={{
          text: {
            fill: "#ffffff",
          },
          tooltip: {
            container: {
              background: "#333333",
              color: "#ffffff",
            },
          },
        }}
        tooltip={({ feature }) => {
          const locationData = chartData.find((d) => d.id === feature.id);
          if (locationData) {
            return (
              <div className="bg-gray-800 text-white p-2 rounded shadow">
                <strong>{locationData.id}</strong>
                <br />
                Temperature: {locationData.value}°C
                <br />
                Lat: {locationData.lat}, Lon: {locationData.lon}
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default GeographyChart;
