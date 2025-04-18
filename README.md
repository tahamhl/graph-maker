# Graph Maker (Grafik Oluşturucu) 

<div style="text-align:center">
  <img src="public/graphmaker.png" alt="Graph Maker Logo" width="200" height="200"/>
</div>

> [Click for Turkish version / Türkçe versiyon için tıklayın](#türkçe)

## 🌐 English

A powerful and user-friendly graph/chart generation tool built with modern web technologies, allowing users to create and customize various types of charts and export them in multiple formats.

### 📋 Features

- **Multiple chart types**:
  - Line charts for trend visualization
  - Bar charts for comparative analysis
  - Pie charts for proportion representation
  - Scatter plots for data correlation analysis

- **Easy data entry**:
  - Simple comma-separated value input
  - Multiple data series support
  - Custom labels for data points

- **Rich customization options**:
  - Custom chart titles
  - Individual color selection for each data point
  - Different styling for different chart types

- **Export capabilities**:
  - Export charts as PNG images
  - Export as vector SVG files for scalable use
  - Export as PDF documents for professional reports

- **User-friendly interface**:
  - Clean, intuitive layout
  - Responsive design for desktop and mobile
  - Real-time chart preview

### 💻 Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework with server-side rendering
  - [React](https://reactjs.org/) - UI component library
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for better code quality
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

- **Charting**:
  - [Chart.js](https://www.chartjs.org/) - Flexible JavaScript charting library
  - [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) - React wrapper for Chart.js

- **Export Tools**:
  - [html2canvas](https://html2canvas.hertzen.com/) - Screenshots with JavaScript
  - [jsPDF](https://github.com/MrRio/jsPDF) - Client-side PDF generation
  - [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - Client-side file saving

### 🚀 Getting Started

#### Prerequisites
- Node.js (v14 or newer)
- npm or yarn

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/tahamhl/graph-maker.git
cd graph-maker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 📱 How to Use

1. **Select chart type**:
   - Choose from bar, line, pie, or scatter chart types

2. **Enter chart title** (optional):
   - Provide a descriptive title for your chart

3. **Enter data**:
   - For most charts: Add comma-separated labels (x-axis values)
   - Enter comma-separated values for each data series
   - For scatter plots: Enter x,y coordinate pairs

4. **Customize colors**:
   - Select colors for each data point
   - Different color options available based on chart type

5. **Create chart**:
   - Click "Create Chart" to generate your visualization

6. **Export options**:
   - After chart creation, use the export buttons to download in PNG, SVG, or PDF format

### 🧩 Project Structure

```
graph-maker/
├── public/                  # Static files
│   ├── graphmaker.png       # Application logo
├── src/                     # Source code
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx         # Main application page
│   │   ├── layout.tsx       # App layout
│   ├── components/          # React components
│   │   ├── BarChart.tsx     # Bar chart component
│   │   ├── LineChart.tsx    # Line chart component
│   │   ├── PieChart.tsx     # Pie chart component
│   │   ├── ScatterChart.tsx # Scatter chart component
│   │   ├── DataForm.tsx     # Data input form component
│   │   ├── ChartExport.tsx  # Chart export functionality
```

### 🛠 Advanced Customization

For advanced users and developers:

- **Adding new chart types**:
  1. Create a new chart component in `/src/components/`
  2. Update the chart type selection in `page.tsx`
  3. Extend the DataForm component to handle specific data requirements

- **Custom styling**:
  - Modify Tailwind classes in component files
  - Adjust Chart.js options in chart components for different appearances

- **Additional export formats**:
  - Extend the ChartExport component with new format handlers

### 📄 License

This project is released under the MIT License - see the [LICENSE](LICENSE) file for details.

### 👨‍💻 Developer

- [@tahamhl](https://github.com/tahamhl)

---

<a name="türkçe"></a>
## 🌐 Türkçe

Modern web teknolojileri ile oluşturulmuş, kullanıcıların çeşitli tiplerde grafikler oluşturmasına ve özelleştirmesine olanak tanıyan güçlü ve kullanıcı dostu bir grafik oluşturma aracı.

### 📋 Özellikler

- **Çeşitli grafik tipleri**:
  - Trend görselleştirmesi için çizgi grafikler
  - Karşılaştırmalı analiz için sütun grafikler
  - Oransal gösterim için pasta grafikler
  - Veri korelasyonu analizi için dağılım grafikler

- **Kolay veri girişi**:
  - Basit virgülle ayrılmış değer girişi
  - Çoklu veri serisi desteği
  - Veri noktaları için özel etiketler

- **Zengin özelleştirme seçenekleri**:
  - Özel grafik başlıkları
  - Her veri noktası için ayrı renk seçimi
  - Farklı grafik tipleri için farklı stillemeler

- **Dışa aktarma özellikleri**:
  - Grafikleri PNG resim olarak dışa aktarma
  - Ölçeklenebilir kullanım için vektör SVG dosyaları 
  - Profesyonel raporlar için PDF belgeleri

- **Kullanıcı dostu arayüz**:
  - Temiz, sezgisel düzen
  - Masaüstü ve mobil için duyarlı tasarım
  - Gerçek zamanlı grafik önizleme

### 💻 Teknoloji Yığını

- **Ön uç**:
  - [Next.js](https://nextjs.org/) - Sunucu taraflı render özellikli React framework
  - [React](https://reactjs.org/) - UI bileşen kütüphanesi
  - [TypeScript](https://www.typescriptlang.org/) - Daha iyi kod kalitesi için tiplendirilmiş JavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

- **Grafik Oluşturma**:
  - [Chart.js](https://www.chartjs.org/) - Esnek JavaScript grafik kütüphanesi
  - [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) - Chart.js için React wrapper

- **Dışa Aktarma Araçları**:
  - [html2canvas](https://html2canvas.hertzen.com/) - JavaScript ile ekran görüntüsü alma
  - [jsPDF](https://github.com/MrRio/jsPDF) - İstemci taraflı PDF oluşturma
  - [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - İstemci taraflı dosya kaydetme

### 🚀 Başlangıç

#### Ön Koşullar
- Node.js (v14 veya daha yeni)
- npm veya yarn

#### Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/tahamhl/graph-maker.git
cd graph-maker
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

4. Uygulamayı görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 📱 Nasıl Kullanılır

1. **Grafik tipi seçin**:
   - Sütun, çizgi, pasta veya dağılım grafik tiplerinden birini seçin

2. **Grafik başlığı girin** (isteğe bağlı):
   - Grafiğiniz için açıklayıcı bir başlık belirleyin

3. **Veri girin**:
   - Çoğu grafik için: Virgülle ayrılmış etiketler (x ekseni değerleri) ekleyin
   - Her veri serisi için virgülle ayrılmış değerler girin
   - Dağılım grafikleri için: x,y koordinat çiftleri girin

4. **Renkleri özelleştirin**:
   - Her veri noktası için renk seçin
   - Grafik tipine göre farklı renk seçenekleri mevcuttur

5. **Grafik oluşturun**:
   - Görselleştirmenizi oluşturmak için "Grafik Oluştur" düğmesine tıklayın

6. **Dışa aktarma seçenekleri**:
   - Grafik oluşturulduktan sonra, PNG, SVG veya PDF formatında indirmek için dışa aktarma düğmelerini kullanın

### 🧩 Proje Yapısı

```
graph-maker/
├── public/                  # Statik dosyalar
│   ├── graphmaker.png       # Uygulama logosu
├── src/                     # Kaynak kod
│   ├── app/                 # Next.js app dizini
│   │   ├── page.tsx         # Ana uygulama sayfası
│   │   ├── layout.tsx       # Uygulama düzeni
│   ├── components/          # React bileşenleri
│   │   ├── BarChart.tsx     # Sütun grafik bileşeni
│   │   ├── LineChart.tsx    # Çizgi grafik bileşeni
│   │   ├── PieChart.tsx     # Pasta grafik bileşeni
│   │   ├── ScatterChart.tsx # Dağılım grafik bileşeni
│   │   ├── DataForm.tsx     # Veri giriş formu bileşeni
│   │   ├── ChartExport.tsx  # Grafik dışa aktarma işlevselliği
```

### 🛠 Gelişmiş Özelleştirme

İleri düzey kullanıcılar ve geliştiriciler için:

- **Yeni grafik tiplerinin eklenmesi**:
  1. `/src/components/` içinde yeni bir grafik bileşeni oluşturun
  2. `page.tsx` içinde grafik tipi seçimini güncelleyin
  3. DataForm bileşenini özel veri gereksinimlerini işleyecek şekilde genişletin

- **Özel stilleme**:
  - Bileşen dosyalarındaki Tailwind sınıflarını değiştirin
  - Farklı görünümler için grafik bileşenlerindeki Chart.js seçeneklerini ayarlayın

- **Ek dışa aktarma formatları**:
  - ChartExport bileşenini yeni format işleyicileriyle genişletin

### 📄 Lisans

Bu proje MIT Lisansı altında yayınlanmıştır - ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

### 👨‍💻 Geliştirici

- [@tahamhl](https://github.com/tahamhl)
