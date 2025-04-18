'use client';

import React, { useState, useEffect } from 'react';

interface DataFormProps {
  onDataSubmit: (data: any) => void;
  chartType: string;
}

const DataForm: React.FC<DataFormProps> = ({ onDataSubmit, chartType }) => {
  const [labels, setLabels] = useState<string>('');
  const [datasetLabels, setDatasetLabels] = useState<string[]>(['Veri Seti 1']);
  const [datasetValues, setDatasetValues] = useState<string[]>(['']);
  const [colors, setColors] = useState<string[]>(['#FF6384']);
  const [multiColors, setMultiColors] = useState<string[][]>([['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']]);

  const addDataset = () => {
    setDatasetLabels([...datasetLabels, `Veri Seti ${datasetLabels.length + 1}`]);
    setDatasetValues([...datasetValues, '']);
    setColors([...colors, getRandomColor()]);
    
    // Yeni veri seti için 6 rastgele renk oluştur
    const newColors = Array(6).fill('').map(() => getRandomColor());
    setMultiColors([...multiColors, newColors]);
  };

  const removeDataset = (index: number) => {
    if (datasetLabels.length > 1) {
      const newLabels = [...datasetLabels];
      newLabels.splice(index, 1);
      setDatasetLabels(newLabels);

      const newValues = [...datasetValues];
      newValues.splice(index, 1);
      setDatasetValues(newValues);

      const newColors = [...colors];
      newColors.splice(index, 1);
      setColors(newColors);
      
      const newMultiColors = [...multiColors];
      newMultiColors.splice(index, 1);
      setMultiColors(newMultiColors);
    }
  };

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...datasetLabels];
    newLabels[index] = value;
    setDatasetLabels(newLabels);
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...datasetValues];
    newValues[index] = value;
    setDatasetValues(newValues);
    
    // Değerler değiştiğinde, renk sayısını kontrol et
    const valueCount = value.split(',').length;
    const currentColors = multiColors[index];
    
    // Eğer yeterli renk yoksa, yeni renkler ekle
    if (valueCount > currentColors.length) {
      const additionalColors = Array(valueCount - currentColors.length).fill('').map(() => getRandomColor());
      const newMultiColors = [...multiColors];
      newMultiColors[index] = [...currentColors, ...additionalColors];
      setMultiColors(newMultiColors);
    }
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };
  
  const handleMultiColorChange = (datasetIndex: number, colorIndex: number, value: string) => {
    const newMultiColors = [...multiColors];
    newMultiColors[datasetIndex][colorIndex] = value;
    setMultiColors(newMultiColors);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Metin dizisini etiketlere dönüştürme
    const labelArray = labels.split(',').map(label => label.trim());
    
    // Veri setlerini hazırlama
    const datasets = datasetLabels.map((label, index) => {
      // Metin dizisini sayı dizisine dönüştürme
      const dataValues = datasetValues[index].split(',').map(value => parseFloat(value.trim()));
      
      if (chartType === 'scatter') {
        // Scatter grafik için X,Y formatında veri
        const scatterData = [];
        for (let i = 0; i < dataValues.length; i += 2) {
          if (i + 1 < dataValues.length) {
            scatterData.push({ x: dataValues[i], y: dataValues[i + 1] });
          }
        }
        return {
          label,
          data: scatterData,
          backgroundColor: colors[index],
        };
      } else {
        // Her bir değer için ayrı renk kullanımı için
        const colorArray = multiColors[index].slice(0, dataValues.length);
        
        return {
          label,
          data: dataValues,
          backgroundColor: chartType === 'line' ? 'rgba(0,0,0,0.1)' : colorArray,
          borderColor: chartType === 'line' ? colors[index] : colorArray,
          borderWidth: 1,
        };
      }
    });

    // Form verilerini ana bileşene gönderme
    const formData = chartType === 'scatter' 
      ? { datasets } 
      : { labels: labelArray, datasets };
      
    onDataSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {chartType !== 'scatter' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Etiketler (virgülle ayrılmış):
          </label>
          <input
            type="text"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
            placeholder="Etiket 1, Etiket 2, Etiket 3"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Örnek: Ocak, Şubat, Mart
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Veri Setleri</h3>
          <button
            type="button"
            onClick={addDataset}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Yeni Veri Seti Ekle
          </button>
        </div>

        {datasetLabels.map((label, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between">
              <h4 className="text-md font-medium text-gray-700">Veri Seti {index + 1}</h4>
              {datasetLabels.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDataset(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Kaldır
                </button>
              )}
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Veri Seti Etiketi:
              </label>
              <input
                type="text"
                value={datasetLabels[index]}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                required
              />
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">
                {chartType === 'scatter' 
                  ? 'Değerler (virgülle ayrılmış X,Y çiftleri):' 
                  : 'Değerler (virgülle ayrılmış):'}
              </label>
              <input
                type="text"
                value={datasetValues[index]}
                onChange={(e) => handleValueChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder={chartType === 'scatter' ? "10,20, 30,40, 50,60" : "10, 20, 30, 40, 50"}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {chartType === 'scatter' 
                  ? 'Örnek: 10,20, 30,40 (burada 10,20 bir nokta, 30,40 başka bir nokta)' 
                  : 'Örnek: 10, 20, 30'}
              </p>
            </div>
            
            {chartType === 'scatter' ? (
              // Scatter grafiği için tek renk
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  Renk:
                </label>
                <input
                  type="color"
                  value={colors[index]}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="mt-1 block"
                />
              </div>
            ) : (
              // Diğer grafikler için çoklu renk
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {chartType === 'line' ? 'Çizgi Rengi:' : 'Veri Renkleri:'}
                </label>
                
                {chartType === 'line' ? (
                  // Çizgi grafiği için tek renk
                  <input
                    type="color"
                    value={colors[index]}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="mt-1 block"
                  />
                ) : (
                  // Bar ve Pie için her bir değer için ayrı renk
                  <div>
                    <div className="grid grid-cols-3 gap-2">
                      {datasetValues[index].split(',').map((value, valueIndex) => (
                        <div key={valueIndex} className="flex flex-col items-center">
                          <span className="text-xs mb-1">{value.trim()}</span>
                          <input
                            type="color"
                            value={multiColors[index][valueIndex] || getRandomColor()}
                            onChange={(e) => handleMultiColorChange(index, valueIndex, e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Her bir veri değeri için farklı renk seçebilirsiniz
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Grafik Oluştur
        </button>
      </div>
    </form>
  );
};

export default DataForm; 