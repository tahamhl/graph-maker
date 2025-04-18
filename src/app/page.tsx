'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Grafikler için dinamik import kullanıyoruz (client component oldukları için)
const LineChart = dynamic(() => import('@/components/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('@/components/PieChart'), { ssr: false });
const ScatterChart = dynamic(() => import('@/components/ScatterChart'), { ssr: false });
const DataForm = dynamic(() => import('@/components/DataForm'), { ssr: false });
const ChartExport = dynamic(() => import('@/components/ChartExport'), { ssr: false });

export default function Home() {
  const [chartType, setChartType] = useState<string>('bar');
  const [chartData, setChartData] = useState<any>(null);
  const [chartTitle, setChartTitle] = useState<string>('');
  const chartRef = useRef<HTMLDivElement>(null);

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
    setChartData(null); // Grafik türü değiştiğinde veriyi sıfırla
  };

  const handleDataSubmit = (data: any) => {
    setChartData(data);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartTitle(e.target.value);
  };

  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case 'line':
        return <LineChart userData={chartData} title={chartTitle || 'Çizgi Grafiği'} />;
      case 'bar':
        return <BarChart userData={chartData} title={chartTitle || 'Sütun Grafiği'} />;
      case 'pie':
        return <PieChart userData={chartData} title={chartTitle || 'Pasta Grafiği'} />;
      case 'scatter':
        return <ScatterChart userData={chartData} title={chartTitle || 'Dağılım Grafiği'} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Image 
              src="/graphmaker.png" 
              alt="GraphMaker Logo" 
              width={120} 
              height={120} 
              className="mr-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Grafik Oluşturucu</h1>
          </div>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Verilerinizi girin ve istediğiniz grafiği hemen oluşturun!
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Hazırlayan: <a href="https://github.com/tahamhl" className="text-indigo-600 hover:text-indigo-800">@tahamhl</a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol panel - Ayarlar */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Grafik Tipi Seçin</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleChartTypeChange('bar')}
                  className={`py-2 px-4 rounded-md ${
                    chartType === 'bar'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Sütun Grafik
                </button>
                <button
                  onClick={() => handleChartTypeChange('line')}
                  className={`py-2 px-4 rounded-md ${
                    chartType === 'line'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Çizgi Grafik
                </button>
                <button
                  onClick={() => handleChartTypeChange('pie')}
                  className={`py-2 px-4 rounded-md ${
                    chartType === 'pie'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Pasta Grafik
                </button>
                <button
                  onClick={() => handleChartTypeChange('scatter')}
                  className={`py-2 px-4 rounded-md ${
                    chartType === 'scatter'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Dağılım Grafik
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Grafik Başlığı</h2>
              <input
                type="text"
                value={chartTitle}
                onChange={handleTitleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Grafiğinize bir başlık girin"
              />
            </div>

            <DataForm onDataSubmit={handleDataSubmit} chartType={chartType} />
          </div>

          {/* Sağ panel - Grafik görüntüleme */}
          <div className="w-full md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md h-full min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Grafik Önizleme</h2>
                {chartData && <ChartExport chartRef={chartRef} title={chartTitle || `${chartType}_grafik`} />}
              </div>
              
              {chartData ? (
                <div className="flex-grow flex items-center justify-center">
                  <div ref={chartRef} className="w-full h-full max-h-[600px]">
                    {renderChart()}
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-gray-400">
                  <Image 
                    src="/graphmaker.png"
                    alt="GraphMaker Logo"
                    width={180}
                    height={180}
                    className="mb-4 opacity-30"
                  />
                  <p className="text-xl">Grafiğiniz burada görüntülenecek</p>
                  <p className="mt-2">Veri girin ve 'Grafik Oluştur' düğmesine tıklayın</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
