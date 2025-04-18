'use client';

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

// Chart.js bileşenlerini kaydetme
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartProps {
  userData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ userData, title = 'Pasta Grafiği' }) => {
  const [chartData, setChartData] = useState<ChartData<'pie'>>({
    labels: [],
    datasets: [],
  });

  const chartOptions: ChartOptions<'pie'> = {
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
  };

  useEffect(() => {
    if (userData) {
      setChartData({
        labels: userData.labels,
        datasets: userData.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor,
          borderWidth: dataset.borderWidth || 1,
        })),
      });
    }
  }, [userData]);

  return <Pie options={chartOptions} data={chartData} />;
};

export default PieChart; 