'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

interface ChartExportProps {
  chartRef: React.RefObject<HTMLDivElement | null>;
  title: string;
}

const ChartExport: React.FC<ChartExportProps> = ({ chartRef, title }) => {
  const sanitizeFileName = (name: string): string => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  const handleExportAsPNG = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current);
      
      const dataUrl = canvas.toDataURL('image/png');
      const fileName = `${sanitizeFileName(title || 'grafik')}.png`;
      
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG dışa aktarma hatası:', error);
      alert('PNG olarak dışa aktarma sırasında bir hata oluştu.');
    }
  };

  const handleExportAsSVG = async () => {
    if (!chartRef.current) return;
    
    try {
      // SVG içeriğini alma (Chart.js tarafından oluşturulan SVG)
      const svgElement = chartRef.current.querySelector('svg');
      
      if (!svgElement) {
        alert('SVG öğesi bulunamadı. Grafiğin doğru şekilde yüklendiğinden emin olun.');
        return;
      }
      
      // SVG öğesinin bir kopyasını oluştur
      const svgClone = svgElement.cloneNode(true) as SVGElement;
      
      // Stil ekle
      const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = `
        .chartjs-render-monitor {
          display: block;
          height: 100%;
          width: 100%;
        }
      `;
      svgClone.appendChild(style);
      
      // SVG'yi string olarak alma
      const svgData = new XMLSerializer().serializeToString(svgClone);
      
      // SVG'yi URL'ye dönüştürme
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const fileName = `${sanitizeFileName(title || 'grafik')}.svg`;
      
      saveAs(svgBlob, fileName);
    } catch (error) {
      console.error('SVG dışa aktarma hatası:', error);
      alert('SVG olarak dışa aktarma sırasında bir hata oluştu.');
    }
  };

  const handleExportAsPDF = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
      });
      
      // PDF sayfasının boyutlarını al
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Görüntü oranını koru
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      
      // PDF'ye başlık ekle
      pdf.setFontSize(16);
      pdf.text(title || 'Grafik', pdfWidth / 2, 15, { align: 'center' });
      
      // PDF'ye grafik ekle
      pdf.addImage(imgData, 'PNG', imgX, imgY + 10, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `${sanitizeFileName(title || 'grafik')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF dışa aktarma hatası:', error);
      alert('PDF olarak dışa aktarma sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={handleExportAsPNG}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        PNG
      </button>
      <button
        onClick={handleExportAsSVG}
        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        SVG
      </button>
      <button
        onClick={handleExportAsPDF}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        PDF
      </button>
    </div>
  );
};

export default ChartExport; 