import React, { useState } from 'react';
import './style/BusinessClassAnalysis.scss';

const BusinessClassAnalysis = ({ brokerData }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const uniqueBusinessClasses = Array.from(new Set(brokerData.map((broker) => broker['Market Type'])));

  const handleClassClick = (businessClass) => {
    setSelectedClass((prevSelectedClass) => (prevSelectedClass === businessClass ? null : businessClass));
  };

  const filteredData = selectedClass ? brokerData.filter((broker) => broker['Market Type'] === selectedClass) : brokerData;

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
