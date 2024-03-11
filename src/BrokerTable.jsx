  import React, { useState } from 'react';
  import './style/BrokerTable.scss';
  import Slider from 'react-slick';
  const BrokerTable = ({ brokerData }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [sliderContent, setSliderContent] = useState([]);
    const years = [...new Set(brokerData.map((broker) => broker.Year))];

    const sortedBrokers = brokerData
      .filter((broker) => selectedYear === '' || broker.Year.toString() === selectedYear)
      .sort((a, b) => b.GWP - a.GWP)
      .slice(0, 10);

    // const topBroker2021 = brokerData.find((broker) => broker.Year === 2021);
    // const topBroker2022 = brokerData.find((broker) => broker.Year === 2022);
    const lowestGWP2021 = brokerData.reduce(
      (min, broker) => (broker.Year === 2021 && broker.GWP < min.GWP ? broker : min),
      brokerData[0]
    );
    const highGWP2021 = brokerData.reduce(
      (max, broker) => (broker.Year === 2021 && broker.GWP > max.GWP ? broker : max),
      brokerData[0]
    );
    const highGWP2022 = brokerData.reduce(
      (max, broker) => (broker.Year === 2022 && broker.GWP > max.GWP ? broker : max),
      brokerData[0]
    );
  
    const lowestGWP2022 = brokerData.reduce(
      (min, broker) => (broker.Year === 2022 && broker.GWP < min.GWP ? broker : min),
      brokerData[0]
    );

    const handleYearChange = (year) => {
      setSelectedYear(year);
    };

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000, // Adjust the autoplay speed here (in milliseconds)
    };
    
    return (
      <div className="BrokerTable">
        <Slider {...settings}>
          {[
           { title: 'Broker with Highest GWP in 2021', broker: highGWP2021 },
           { title: 'Broker with Highest GWP in 2022', broker: highGWP2022 },
            { title: 'Broker with Lowest GWP in 2021', broker: lowestGWP2021 },
            { title: 'Broker with Lowest GWP in 2022', broker: lowestGWP2022 },
          ].map((slide, index) => (
            <div key={index} className="slider-item">
              <h3>{slide.title}</h3>
              {slide.broker ? (
                <>
                  <p>{slide.broker['Broker Name']}</p>
                  <p>GWP: {slide.broker.GWP.toLocaleString()}</p>
                </>
              ) : (
                <ul>
                  {slide.brokers &&
                    slide.brokers.map((broker) => <li key={broker.id}>{broker['Broker Name']}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Slider>
        <h2>Top 10 Brokers Performance</h2>
        <div>
          <label htmlFor="year" style={{ color: 'black' }}>
            Select Year:
          </label>
          <select id="year" onChange={(e) => handleYearChange(e.target.value)}>
            <option value="">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Broker Name</th>
              <th>Open Market (GWP)</th>
              <th>Facilities (GWP)</th>
              <th>Combined (GWP)</th>
              <th>Planned GWP</th>
              <th>Actual vs Planned (%)</th>
            </tr>
          </thead>
          <tbody>
            {sortedBrokers.map((broker) => (
              <tr key={broker.id}>
                <td>{broker['Broker Name']}</td>
                <td>{broker['Market Type'] === 'Open Market' ? broker['GWP'].toLocaleString() : 0}</td>
                <td>{broker['Market Type'] === 'Facilities' ? broker['GWP'].toLocaleString() : 0}</td>
                <td>{broker['GWP'].toLocaleString()}</td>
                <td>{broker['Planned GWP'].toLocaleString()}</td>
                <td className={broker['Planned GWP'] - broker['GWP'] >= 0 ? 'positive' : 'negative'}>
                  {(((broker['Planned GWP'] - broker['GWP']) / broker['Planned GWP']) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default BrokerTable;
