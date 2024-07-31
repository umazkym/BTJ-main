"use client";

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { ChartOptions, Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { RadarData } from './types';

// 必要なスケールを登録
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// レーダーチャートのオプション
const radarOptions: ChartOptions<'radar'> = {
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 5,
      pointLabels: {
        font: {
          size: 16,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 12,
        },
        usePointStyle: true,
        pointStyle: 'line',
      },
    },
  },
  maintainAspectRatio: false,
};

// 初期のレーダーチャートデータ
export const initialRadarData: RadarData = {
  labels: [
    'しっかりとした苦味', '飲みごたえ', '濃厚な味わい', 'まろやか', 'やわらかな苦味', 'フルーティな味わい', '爽快なキレ', '後味（余韻）がよい'
  ],
  datasets: [
    {
      label: '',
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      borderWidth: 2,
    },
  ],
};

// レーダーチャートコンポーネント
const RadarChartComponent: React.FC<{ radarData: RadarData }> = ({ radarData }) => (
  <Radar className='w-full' data={radarData} options={radarOptions} />
);

export default RadarChartComponent;
