import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

const ListingsByFurnishedStatusChart = () => {
  const chartRef = useRef(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings data from the backend
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/admin/listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length === 0) return;

    // Count the number of furnished and unfurnished listings
    const furnishedCount = listings.filter(
      (listing) => listing.furnished
    ).length;
    const unfurnishedCount = listings.length - furnishedCount;

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "Listings by Furnished Status",
        left: "center",
        textStyle: {
          color: "#333",
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        bottom: 10, // Place the legend at the bottom
        left: "center", // Center the legend horizontally
        data: ["Furnished", "Unfurnished"],
        textStyle: {
          color: "#333", // Color of the legend text
        },
      },
      grid: {
        top: "15%",
        left: "10%",
        right: "10%",
        bottom: "20%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Furnished", "Unfurnished"],
        axisLabel: {
          fontSize: 14,
          color: "#333",
        },
        axisLine: {
          lineStyle: {
            color: "#333",
          },
        },
      },
      yAxis: {
        type: "value",
        name: "Number of Listings",
        axisLabel: {
          fontSize: 14,
          color: "#333",
        },
        axisLine: {
          lineStyle: {
            color: "#333",
          },
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#ccc",
          },
        },
      },
      series: [
        {
          name: "Furnished",
          type: "bar",
          data: [furnishedCount, unfurnishedCount],
          itemStyle: {
            color: function (params) {
              // Assign color based on the data index
              return params.dataIndex === 0 ? "#5470c6" : "#91cc75"; // Blue for Parking, Green for No Parking
            },
          },
          barWidth: "50%",
        },
        {
          name: "Unfurnished",
          type: "bar",
          // Ensure data order matches the xAxis data
          itemStyle: {
            color: "#91cc75", // Green for No Parking
          },
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [listings]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default ListingsByFurnishedStatusChart;
