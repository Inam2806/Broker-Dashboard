import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';
import BrokerTable from './BrokerTable';
import BrokerCharts from './BrokerCharts';
import BusinessClassAnalysis from './BusinessClassAnalysis';
import './style/App.scss';
import Welcome from './Welcome';

const App = () => {
  const [brokerData, setBrokerData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching or reading the Excel file:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className={`container ${loading ? 'loading' : ''}`}>
        {loading ? (
          // Loading state, you can customize the loading content here
          <p>Loading...</p>
        ) : (
          <>
            <h1>Insurance Dashboard 2024</h1>
            <nav className="centered-nav">
              <ul>
                <li>
                  <NavLink to="/broker-table" activeClassName="active" style={{ color: 'black' }}><h4>Broker Table</h4></NavLink>
                </li>
                <li>
                  <NavLink to="/broker-charts" activeClassName="active" style={{ color: 'black' }}><h4>Broker Charts</h4></NavLink>
                </li>
                <li>
                  <NavLink to="/business-class-analysis" activeClassName="active" style={{ color: 'black' }}><h4>Business Class Analysis</h4></NavLink>
                </li>
              
                <li>
                  <a href="https://mediafiles.botpress.cloud/73923520-cd6a-4d9e-abf3-0b9e315002d0/webchat/bot.html" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                    <h4>Chatbot</h4>
                  </a>
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
              <Route
                path="/"
                element={<Welcome />}
              />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
