import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './style/BrokerCharts.scss';

const BrokerCharts = ({ brokerData }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const sortedBrokerData = brokerData.sort((a, b) => a.Year - b.Year);
    setFilteredData(sortedBrokerData);
  }, [brokerData]);

  useEffect(() => {
    if (selectedYear) {
      const filteredBrokerData = brokerData.filter((broker) => broker.Year === selectedYear);
      setFilteredData(filteredBrokerData);
    }
  }, [selectedYear, brokerData]);

  const years = [...new Set(brokerData.map((broker) => broker.Year))];

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const prepareChartData = () => {
    const labels = [];
    const openMarketData = [];
    const facilitiesData = [];

    filteredData.forEach((broker) => {
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
          display: false,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="broker-charts">
      <h2>Performance Charts</h2>
      <div>
        <label htmlFor="year" style={{color:'black'}}>Select Year:</label>
        <select id="year" onChange={(e) => handleYearChange(parseInt(e.target.value))}>
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BrokerCharts;
