import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


const Task = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/fetchdata');
      setData(result.data);
      setFilteredData(result.data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter(d => d[key]?.toString().includes(filters[key]));
        }
      });
      setFilteredData(filtered);
    };
    applyFilters();
  }, [filters, data]);

 
  return (
    <>
 
     <div className="App bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Data Visualization Dashboard</h1>
      <div className="filters grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {Object.keys(filters).map((filterKey) => (
          <div key={filterKey} className="flex flex-col">
            <label className="font-medium">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:</label>
            <input 
              type="text" 
              name={filterKey} 
              value={filters[filterKey]} 
              onChange={handleFilterChange} 
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
      <Plot
        data={[
          {
            type: 'bar',
            x: filteredData.map(item => item.country),
            y: filteredData.map(item => item.intensity),
            name: 'Intensity'
          },
          {
            type: 'bar',
            x: filteredData.map(item => item.country),
            y: filteredData.map(item => item.likelihood),
            name: 'Likelihood'
          },
          {
            type: 'bar',
            x: filteredData.map(item => item.country),
            y: filteredData.map(item => item.relevance),
            name: 'Relevance'
          }
        ]}
        layout={{ 
          width: 1000, 
          height: 500, 
          title: 'Data Visualization',
          barmode: 'group'
        }}
      />
    </div>
    </>
   
  );
};

export default Task;
