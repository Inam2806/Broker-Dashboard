import React from 'react';
import './style/BrokerTable.scss';

const BrokerTable = ({ brokerData }) => {
  const sortedBrokers = brokerData.sort((a, b) => b.GWP - a.GWP).slice(0, 10);

  return (
    <div className="BrokerTable">
      <h2>Top 10 Brokers Performance</h2>
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
