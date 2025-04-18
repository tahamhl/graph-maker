'use client';

import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

// Chart.js bileşenlerini kaydetme
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ScatterChartProps {
  userData: {
    datasets: {
      label: string;
      data: Array<{ x: number; y: number }>;
      backgroundColor: string;
    }[];
  };
  title?: string;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ userData, title = 'Dağılım Grafiği' }) => {
  const [chartData, setChartData] = useState<ChartData<'scatter'>>({
    datasets: [],
  });

  const chartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
      },
    },
  };

  useEffect(() => {
    if (userData) {
      setChartData({
        datasets: userData.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
        })),
      });
    }
  }, [userData]);

  return <Scatter options={chartOptions} data={chartData} />;
};

export default ScatterChart; 