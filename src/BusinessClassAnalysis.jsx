import React, { useState } from 'react';
import './style/BusinessClassAnalysis.scss';

const BusinessClassAnalysis = ({ brokerData }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');

  const uniqueBusinessClasses = Array.from(new Set(brokerData.map((broker) => broker['Market Type'])));
  const years = Array.from(new Set(brokerData.map((broker) => broker.Year.toString())));

  const handleClassClick = (businessClass) => {
    setSelectedClass((prevSelectedClass) => (prevSelectedClass === businessClass ? null : businessClass));
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const filteredData = brokerData.filter(
    (broker) =>
      (selectedClass ? broker['Market Type'] === selectedClass : true) &&
      (selectedYear ? broker.Year.toString() === selectedYear : true)
  );

  return (
    <div className="business-class-analysis">
      <h2>Business Class Analysis</h2>
      <div>
        <h3>Select Business Class:</h3>
        <div className="button-container">
          {uniqueBusinessClasses.map((businessClass, index) => (
            <button
              key={index}
              onClick={() => handleClassClick(businessClass)}
              className={businessClass === selectedClass ? 'selected' : ''}
            >
              {businessClass}
            </button>
          ))}
        </div>
      </div>

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
            <th>GWP</th>
            <th>Planned GWP</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((broker, index) => (
            <tr key={index}>
              <td>{broker['Broker Name']}</td>
              <td>{broker['GWP']}</td>
              <td>{broker['Planned GWP']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessClassAnalysis;
