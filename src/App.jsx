import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';
import BrokerTable from './BrokerTable';
import BrokerCharts from './BrokerCharts';
import BusinessClassAnalysis from './BusinessClassAnalysis';
import './style/App.scss';

const App = () => {
  const [brokerData, setBrokerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cloudinaryLink = 'https://res.cloudinary.com/dkdz37uxc/raw/upload/v1709778267/Data.xlsx';

      try {
        const response = await axios.get(cloudinaryLink, { responseType: 'arraybuffer' });
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setBrokerData(jsonData);
      } catch (error) {
        console.error('Error fetching or reading the Excel file:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>Insurance Dashboard 2024</h1>
        <nav className="centered-nav">
          <ul>
            <li>
              <Link to="/broker-table">Broker Table</Link>
            </li>
            <li>
              <Link to="/broker-charts">Broker Charts</Link>
            </li>
            <li>
              <Link to="/business-class-analysis">Business Class Analysis</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/broker-table"
            element={<BrokerTable brokerData={brokerData} />}
          />
          <Route
            path="/broker-charts"
            element={<BrokerCharts brokerData={brokerData} />}
          />
          <Route
            path="/business-class-analysis"
            element={<BusinessClassAnalysis brokerData={brokerData} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
