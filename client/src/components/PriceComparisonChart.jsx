import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

const PriceComparisonChart = () => {
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

    // Filter the listings to include only those with offer === true
    const filteredListings = listings.filter(
      (listing) => listing.offer === true
    );

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "Comparison of Regular Price vs. Discount Price",
        left: "center",
        textStyle: {
          color: "#333",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Regular Price", "Discount Price"],
        bottom: 10,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: filteredListings.map((listing) => listing.name),
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
        name: "Price ($)",
      },
      series: [
        {
          name: "Regular Price",
          type: "bar",
          data: filteredListings.map((listing) => listing.regularPrice),
          itemStyle: {
            color: "#5470c6",
          },
        },
        {
          name: "Discount Price",
          type: "bar",
          data: filteredListings.map((listing) => listing.discountPrice),
          itemStyle: {
            color: "#91cc75",
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

export default PriceComparisonChart;
