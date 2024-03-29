import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(65, 105, 225, 0.65)',
              'rgba(65, 225, 105, 0.65)',
              'rgba(230, 40, 30, 0.65)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#46e',
            backgroundColor: '#4169e13f',
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: '#e31',
            backgroundColor: '#e6281e3f',
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: '#008000',
            backgroundColor: '#00ff003f',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{country ? barChart : lineChart}</div>;
};

export default Chart;
