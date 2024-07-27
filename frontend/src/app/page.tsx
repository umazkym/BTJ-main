"use client";

import React, { useState, ChangeEvent } from 'react';
import Select, { SingleValue } from 'react-select';
import { Radar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';
import axios from 'axios';

// レーダーチャートの設定
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// 銘柄の選択肢
const brandOptions = [
  { value: "1", label: "黒ラベル" },
  { value: "2", label: "ヱビスビール" },
  { value: "3", label: "ヱビスプレミアムエール" },
  { value: "4", label: "ヱビスプレミアムブラック" },
  { value: "5", label: "ヱビスシトラスブラン" },
  { value: "6", label: "ヱビスジューシーエール" },
  { value: "7", label: "ナナマル" },
  { value: "8", label: "サッポロラガービール" },
  { value: "9", label: "サッポロクラシック" },
  { value: "10", label: "SORACHI1984" },
  { value: "11", label: "岸和田ビール 鐵工" },
  { value: "12", label: "つくばブルワリー 金色姫IPA" },
  { value: "13", label: "滝川クラフトビール工房 空知ヴァイツェン" },
  { value: "14", label: "大山Ｇビール スタウト" },
  { value: "15", label: "ヘリオス酒造沢内醸造所 ザ・マタギ" },
  { value: "16", label: "KIX BEER ヴァイツェン" },
  { value: "17", label: "南信州ビール AmberAle" },
  { value: "18", label: "Y.MARKET BREWING ワット ザ ヘル" },
  { value: "19", label: "長濱浪漫ビール 長浜エール" },
  { value: "20", label: "TOSACO 土佐IPA" },
  { value: "21", label: "HNB 広島日の出ラガー" },
  { value: "22", label: "暁ブルワリー ドラゴンアイ サン" },
  { value: "23", label: "田沢湖ビール ピルスナー" },
  { value: "24", label: "六甲ビール WEST COAST SESSION IPA" },
  { value: "25", label: "那須高原ビール ベルジャンホワイト" },
  { value: "26", label: "ゴールデンラビットビール 青二才" },
  { value: "27", label: "宮島ビール 広島レッドエール" },
  { value: "28", label: "遠野麦酒ZUMONA アルト" },
  { value: "29", label: "鎌倉ビール（月）" },
  { value: "30", label: "南信州ビール AppleHop" },
];

// 性別と年齢の選択肢
const genderOptions = ["男性", "女性"];
const ageOptions = ["20代", "30代", "40代", "50代", "60代", "70代～"];

// レーダーチャートのデータ型
interface RadarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

// フィルタのデータ型
interface Filter {
  selectedOptions: string[];
  selectedBrand: string | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  radarData: RadarData;
  apiUrl: string | null;
  fetchedData: any;
}

// レーダーチャートの初期値
const initialRadarData: RadarData = {
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

// レーダーチャートの設定
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

// フィルタコンポーネント
const FilterComponent: React.FC<{ filter: Filter, index: number, handleCheckboxChange: any, handleBrandChange: any, handleDateChange: any, updateRadarData: any }> = ({
  filter, index, handleCheckboxChange, handleBrandChange, handleDateChange, updateRadarData
}) => (
  <div key={index} className='flex flex-col lg:flex-row mb-10 bg-white shadow-lg rounded-lg'>
    <div className='w-full lg:w-1/2 p-4'>
      <h2 className='font-bold text-xl mb-4'>銘柄</h2>
      <Select
        options={brandOptions}
        onChange={(selectedOption) => handleBrandChange(index, selectedOption as SingleValue<{ value: string, label: string }>)}
        className='mb-4'
      />

      <h2 className='font-bold text-xl mb-4'>性別</h2>
      <div className='flex flex-wrap bg-white'>
        {genderOptions.map((option) => (
          <div key={option} className='mr-4 mb-2'>
            <label className='flex items-center space-x-2'>
              <input
                type="checkbox"
                value={option}
                checked={filter.selectedOptions.includes(option)}
                onChange={(event) => handleCheckboxChange(index, event, genderOptions)}
                className='form-checkbox'
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
        <label className='flex items-center space-x-2'>
          <input
            type="checkbox"
            value="全て"
            checked={genderOptions.every(option => filter.selectedOptions.includes(option))}
            onChange={(event) => handleCheckboxChange(index, event, genderOptions)}
            className='form-checkbox'
          />
          <span>全て</span>
        </label>
      </div>

      <h2 className='font-bold text-xl mb-4'>年齢</h2>
      <div className='flex flex-wrap bg-white'>
        {ageOptions.map((option) => (
          <div key={option} className='mr-4 mb-2'>
            <label className='flex items-center space-x-2'>
              <input
                type="checkbox"
                value={option}
                checked={filter.selectedOptions.includes(option)}
                onChange={(event) => handleCheckboxChange(index, event, ageOptions)}
                className='form-checkbox'
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
        <label className='flex items-center space-x-2'>
          <input
            type="checkbox"
            value="全て"
            checked={ageOptions.every(option => filter.selectedOptions.includes(option))}
            onChange={(event) => handleCheckboxChange(index, event, ageOptions)}
            className='form-checkbox'
          />
          <span>全て</span>
        </label>
      </div>

      <h2 className='font-bold text-xl mb-4'>購入日</h2>
      <div className="flex flex-col space-y-2">
        <DatePicker
          selected={filter.startDate}
          onChange={(date) => handleDateChange(index, date, 'start')}
          selectsStart
          startDate={filter.startDate}
          endDate={filter.endDate}
          dateFormat="yyyy/MM/dd"
          placeholderText="開始日"
          className='w-full border rounded-md p-2'
        />
        <DatePicker
          selected={filter.endDate}
          onChange={(date) => handleDateChange(index, date, 'end')}
          selectsEnd
          startDate={filter.startDate}
          endDate={filter.endDate}
          minDate={filter.startDate}
          dateFormat="yyyy/MM/dd"
          placeholderText="終了日"
          className='w-full border rounded-md p-2'
        />
      </div>

      <button
        onClick={() => updateRadarData(index)}
        className='mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
      >
        検索
      </button>
    </div>
    <div className='w-full lg:w-1/2 p-4'>
      <h2 className='font-bold text-xl mb-4'>レーダーチャート</h2>
      <div className='relative bg-white shadow-lg rounded-lg p-4' style={{ height: '400px' }}>
        <Radar className='w-full' data={filter.radarData} options={radarOptions} />
      </div>
    </div>
  </div>
);

const Page: React.FC = () => {
  // フィルタ条件を保持
  const [filters, setFilters] = useState<Filter[]>([
    { selectedOptions: [], selectedBrand: null, startDate: undefined, endDate: undefined, radarData: initialRadarData, apiUrl: null, fetchedData: null }
  ]);

  // フィルタを追加する関数
  const addFilter = () => {
    setFilters([...filters, { selectedOptions: [], selectedBrand: null, startDate: undefined, endDate: undefined, radarData: initialRadarData, apiUrl: null, fetchedData: null }]);
  };

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (index: number, event: ChangeEvent<HTMLInputElement>, group: string[]) => {
    const value = event.target.value;
    const newFilters = [...filters];
    if (value === "全て") {
      // 「全て」が選択された場合、全てのチェックボックスを選択または解除
      if (group.every(option => newFilters[index].selectedOptions.includes(option))) {
        newFilters[index].selectedOptions = newFilters[index].selectedOptions.filter(option => !group.includes(option));
      } else {
        newFilters[index].selectedOptions = [...newFilters[index].selectedOptions, ...group.filter(option => !newFilters[index].selectedOptions.includes(option))];
      }
    } else {
      // 単一のチェックボックスが選択された場合、それを選択または解除
      newFilters[index].selectedOptions = newFilters[index].selectedOptions.includes(value)
        ? newFilters[index].selectedOptions.filter(option => option !== value)
        : [...newFilters[index].selectedOptions, value];
    }
    setFilters(newFilters);
  };

  // 銘柄の選択変更を処理する関数
  const handleBrandChange = (index: number, selectedOption: SingleValue<{ value: string, label: string }>) => {
    const newFilters = [...filters];
    newFilters[index].selectedBrand = selectedOption ? selectedOption.value : null;
    setFilters(newFilters);
  };

  // 日付の変更を処理する関数
  const handleDateChange = (index: number, date: Date | null, type: 'start' | 'end') => {
    const newFilters = [...filters];
    if (type === 'start') {
      newFilters[index].startDate = date || undefined;
    } else {
      newFilters[index].endDate = date || undefined;
    }
    setFilters(newFilters);
  };

  // 日付のフォーマットを処理する関数
  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // データを取得する関数
  const fetchData = async (index: number) => {
    const filter = filters[index];

    // 性別フィルタのパラメータを作成
    const genderParams = genderOptions
      .filter(option => filter.selectedOptions.includes(option))
      .map(option => (option === "男性" ? "0" : "1"))
      .map(gender => `gender=${gender}`)
      .join('&');

    // 年齢フィルタのパラメータを作成
    const ageParams = ageOptions
      .filter(option => filter.selectedOptions.includes(option))
      .map(age => `age_group=${age.split('代')[0]}`)
      .join('&');

    // APIリクエストのパラメータを作成
    const params = [
      filter.selectedBrand ? `brand_id=${filter.selectedBrand}` : null,
      genderParams,
      ageParams,
      filter.startDate ? `start_date=${formatDate(filter.startDate)}` : null,
      filter.endDate ? `end_date=${formatDate(filter.endDate)}` : null
    ].filter(Boolean).join('&');

    // APIリクエストのURLを設定
    const url = `http://127.0.0.1:8000/filter?${params}`;
    const newFilters = [...filters];
    newFilters[index].apiUrl = url;
    setFilters(newFilters);

    try {
      // データを取得
      const response = await axios.get(url);
      const data = response.data;

      newFilters[index].fetchedData = data;
      setFilters(newFilters);
    } catch (error) {
      console.error("データの取得に失敗しました", error);
    }
  };

  // レーダーチャートのデータを更新する関数
  const updateRadarData = async (index: number) => {
    await fetchData(index);
    const filter = filters[index];
    if (!filter.fetchedData) return;

    // レーダーチャートのラベルを設定
    const labels = [
      'しっかりとした苦味', '飲みごたえ', '濃厚な味わい', 'まろやか', 'やわらかな苦味', 'フルーティな味わい', '爽快なキレ', '後味（余韻）がよい'
    ];

    // 取得したデータから値を設定
    const values = labels.map((label, i) => filter.fetchedData.find((item: any) => item.item_id === (i + 1))?.average_score || 0);

    // 選択されたフィルタの情報を設定
    const selectedFilters = [
      filter.selectedBrand ? `銘柄: ${brandOptions.find(opt => opt.value === filter.selectedBrand)?.label}` : '',
      filter.selectedOptions.length ? `性別: ${filter.selectedOptions.join(', ')}` : '',
      filter.startDate ? `開始日: ${formatDate(filter.startDate)}` : '',
      filter.endDate ? `終了日: ${formatDate(filter.endDate)}` : '',
    ].filter(Boolean).join(' | ');

    // レーダーチャートのデータを更新
    const newFilters = [...filters];
    newFilters[index].radarData = {
      labels,
      datasets: [
        {
          label: selectedFilters,
          data: values,
          backgroundColor: 'rgba(34, 202, 236, 0.2)',
          borderColor: 'rgba(34, 202, 236, 1)',
          borderWidth: 2,
        },
      ],
    };
    setFilters(newFilters);
  };

  return (
    <div className='container mx-auto p-4'>
      {filters.map((filter, index) => (
        <FilterComponent
          key={index}
          filter={filter}
          index={index}
          handleCheckboxChange={handleCheckboxChange}
          handleBrandChange={handleBrandChange}
          handleDateChange={handleDateChange}
          updateRadarData={updateRadarData}
        />
      ))}

      <button
        onClick={addFilter}
        className='mt-5 bg-green-500 text-white py-2 px-4 rounded mx-auto block hover:bg-green-700 transition duration-300'
      >
        追加する
      </button>
    </div>
  );
};

export default Page;
