"use client";

import React, { useState, ChangeEvent } from 'react';
import Select, { SingleValue } from 'react-select';
import { Radar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';
import axios from 'axios';

// レーダーチャートのコンポーネント
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// 選択肢の設定
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

const genderOptions = ["男性", "女性"];
const ageOptions = ["20代", "30代", "40代", "50代", "60代", "70代～"];

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

interface Filter {
  selectedOptions: string[];
  selectedBrand: string | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  radarData: RadarData;
  apiUrl: string | null;
  fetchedData: any;
}

const initialRadarData: RadarData = {
  labels: [
    'しっかりとした苦味', '飲みごたえ', '濃厚な味わい', 'まろやか', 'やわらかな苦味', 'フルーティな味わい', '爽快なキレ', '後味（余韻）がよい'
  ],
  datasets: [
    {
      label: 'サンプルデータセット',
      data: [3, 3, 4, 1, 2, 5, 4, 5],
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      borderWidth: 2,
    },
  ],
};

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
      // 「全て」が選択された場合、全てのチェックボックを選択または解除
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
    fetchData(index); // フィルタが変更されたときにデータを取得
  };

  // 銘柄の選択変更を処理する関数
  const handleBrandChange = (index: number, selectedOption: SingleValue<{ value: string, label: string }>) => {
    const newFilters = [...filters];
    newFilters[index].selectedBrand = selectedOption ? selectedOption.value : null;
    setFilters(newFilters);
    fetchData(index); // フィルタが変更されたときにデータを取得
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
    fetchData(index); // フィルタが変更されたときにデータを取得
  };

  // 日付の表記を処理する関数
  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // パラメータ設定
  const fetchData = async (index: number) => {
    const filter = filters[index];
    const genderParams = genderOptions
      .filter(option => filter.selectedOptions.includes(option))
      .map(option => (option === "男性" ? "0" : "1"))
      .map(gender => `gender=${gender}`)
      .join('&');

    const ageParams = ageOptions
      .filter(option => filter.selectedOptions.includes(option))
      .map(age => `age_group=${age.split('代')[0]}`)
      .join('&');

    // GETリクエスト時に渡すパラメータ
    const params = [
      filter.selectedBrand ? `brand_id=${filter.selectedBrand}` : null,
      genderParams,
      ageParams,
      filter.startDate ? `start_date=${formatDate(filter.startDate)}` : null,
      filter.endDate ? `end_date=${formatDate(filter.endDate)}` : null
    ].filter(Boolean).join('&');

    const url = `http://127.0.0.1:8000/filter?${params}`;
    const newFilters = [...filters];
    newFilters[index].apiUrl = url;
    setFilters(newFilters);

    try {
      const response = await axios.get(url);
      const data = response.data;

      newFilters[index].fetchedData = data;
      setFilters(newFilters);
    } catch (error) {
      console.error("データの取得に失敗しました", error);
    }
  };

  // レーダーチャートの設定
  const radarOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0, // 最小値
        max: 5, // 最大値
        pointLabels: {
          font: {
            size: 16,  // 文字サイズ
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,  // データセットラベルの文字サイズ
          },
        },
      },
    },
  };

  const updateRadarData = (index: number) => {
    const filter = filters[index];
    if (!filter.fetchedData) return;

    const labels = [
      'しっかりとした苦味', '飲みごたえ', '濃厚な味わい', 'まろやか', 'やわらかな苦味', 'フルーティな味わい', '爽快なキレ', '後味（余韻）がよい'
    ];
    const values = labels.map((label, i) => filter.fetchedData.find((item: any) => item.item_id === (i + 1))?.average_score || 0);

    const newFilters = [...filters];
    newFilters[index].radarData = {
      labels,
      datasets: [
        {
          label: 'フィルターデータセット',
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
    <div>
      {filters.map((filter, index) => (
        <div key={index} className='flex'>
          <div className='w-1/2 mx-auto p-10 m-10'>
            <h2 className='font-bold'>銘柄</h2>
            <Select
              options={brandOptions}
              onChange={(selectedOption) => handleBrandChange(index, selectedOption as SingleValue<{ value: string, label: string }>)}
            />

            <h2 className='mt-5 font-bold'>性別</h2>
            <div className='flex bg-white'>
              {genderOptions.map((option) => (
                <div key={option} className='mr-4'>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={filter.selectedOptions.includes(option)}
                      onChange={(event) => handleCheckboxChange(index, event, genderOptions)}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <label>
                <input
                  type="checkbox"
                  value="全て"
                  checked={genderOptions.every(option => filter.selectedOptions.includes(option))}
                  onChange={(event) => handleCheckboxChange(index, event, genderOptions)}
                />
                全て
              </label>
            </div>

            <h2 className='mt-5 font-bold'>年齢</h2>
            <div className='flex bg-white'>
              {ageOptions.map((option) => (
                <div key={option} className='mr-4'>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={filter.selectedOptions.includes(option)}
                      onChange={(event) => handleCheckboxChange(index, event, ageOptions)}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <label>
                <input
                  type="checkbox"
                  value="全て"
                  checked={ageOptions.every(option => filter.selectedOptions.includes(option))}
                  onChange={(event) => handleCheckboxChange(index, event, ageOptions)}
                />
                全て
              </label>
            </div>

            <h2 className='mt-5 font-bold'>購入日</h2>
            <div className="">
              <DatePicker
                selected={filter.startDate}
                onChange={(date) => handleDateChange(index, date, 'start')}
                selectsStart
                startDate={filter.startDate}
                endDate={filter.endDate}
                dateFormat="yyyy/MM/dd"
                placeholderText="開始日"
              />
              <div className="">
                <DatePicker
                  selected={filter.endDate}
                  onChange={(date) => handleDateChange(index, date, 'end')}
                  selectsEnd
                  startDate={filter.startDate}
                  endDate={filter.endDate}
                  minDate={filter.startDate}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="終了日"
                  className='mt-2'
                />
              </div>
            </div>

            <button
              onClick={() => updateRadarData(index)}
              className='mt-5 bg-blue-500 text-white py-2 px-4 rounded'
            >
              検索
            </button>

            {/* {filter.apiUrl && (
              <div className='mt-5'>
                <p>API URL: <a href={filter.apiUrl} target="_blank" rel="noopener noreferrer">{filter.apiUrl}</a></p>
              </div>
            )} */}
          </div>

          <div className='w-1/2 mx-auto rounded-lg p-10 m-10'>
            <h2 className='font-bold'>レーダーチャート</h2>
            <Radar className='bg-white rounded-lg p-10' data={filter.radarData} options={radarOptions} />
          </div>
        </div>
      ))}

      <button
        onClick={addFilter}
        className='mt-5 bg-green-500 text-white py-2 px-4 rounded mx-auto block'
      >
        追加する
      </button>
    </div>
  );
};

export default Page;
