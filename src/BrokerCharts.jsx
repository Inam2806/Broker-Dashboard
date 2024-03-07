import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing 'chart.js/auto' for better responsiveness
import './style/BrokerCharts.scss';

const BrokerCharts = ({ brokerData }) => {
  useEffect(() => {
    let chartInstance = null;

    // Function to destroy existing chart
    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    // Clean up on component unmount
    return () => {
      destroyChart();
    };
  }, []);

  const prepareChartData = () => {
    const labels = [];
    const openMarketData = [];
    const facilitiesData = [];

    brokerData.forEach((broker) => {
      labels.push(broker['Broker Name']);
      if (broker['Market Type'] === 'Open Market') {
        openMarketData.push(broker['GWP']);
        facilitiesData.push(0); // Placeholder for Facilities data
      } else if (broker['Market Type'] === 'Facilities') {
        openMarketData.push(0); // Placeholder for Open Market data
        facilitiesData.push(broker['GWP']);
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Open Market (GWP)',
          data: openMarketData,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
        {
          label: 'Facilities (GWP)',
          data: facilitiesData,
          backgroundColor: 'rgba(255,99,132,0.6)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const data = prepareChartData();

  return (
    <div className="broker-charts">
      <h2>Performance Charts</h2>
      <div className="chart-container">
        <Bar data={data} options={{ maintainAspectRatio: false }} />
      </div>
      {/* Additional charts as needed */}
    </div>
  );
};

export default BrokerCharts;
