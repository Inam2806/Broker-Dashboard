import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './style/BrokerCharts.scss';

const BrokerCharts = ({ brokerData }) => {
  useEffect(() => {
    let chartInstance = null;

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

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
        facilitiesData.push(0);
      } else if (broker['Market Type'] === 'Facilities') {
        openMarketData.push(0);
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

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Broker',
        },
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
    },
  };

  return (
    <div className="broker-charts">
      <h2>Performance Charts</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BrokerCharts;
