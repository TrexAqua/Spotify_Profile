import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import React from 'react';

const FeatureChart = ({ trackFeatures }) => {
  const data = {
    labels: [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'sppechiness',
      'valence',
    ],
    datasets: [
      {
        label: '',
        data: [
          trackFeatures.acousticness,
          trackFeatures.danceability,
          trackFeatures.energy,
          trackFeatures.instrumentalness,
          trackFeatures.liveness,
          trackFeatures.speechiness,
          trackFeatures.valence,
        ],
        borderWidth: 0,
        backgroundColor: [
          '#5e2f39',
          '#5e4124',
          '#5e4f2b',
          '#254141',
          '#214258',
          '#30395b',
          '#3f305e',
        ],
      },
    ],
  };
  return (
    <>
      <div>
        <Bar data={data} />
      </div>
      ;
    </>
  );
};

export default FeatureChart;
