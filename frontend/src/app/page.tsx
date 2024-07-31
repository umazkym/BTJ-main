"use client";

import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import FilterComponent from './components/FilterComponent';
import { Filter, genderOptions, ageOptions, brandOptions } from './components/types';
import { SingleValue } from 'react-select';
import { initialRadarData } from './components/RadarChartComponent';

// ページコンポーネント
const Page: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>([
    { selectedOptions: [], selectedBrand: null, startDate: undefined, endDate: undefined, radarData: initialRadarData, apiUrl: null, fetchedData: null }
  ]);

  // フィルターを追加する関数
  const addFilter = () => {
    setFilters([...filters, { selectedOptions: [], selectedBrand: null, startDate: undefined, endDate: undefined, radarData: initialRadarData, apiUrl: null, fetchedData: null }]);
  };

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (index: number, event: ChangeEvent<HTMLInputElement>, group: string[]) => {
    const value = event.target.value;
    const newFilters = [...filters];
    if (value === "全て") {
      // 全てのチェックボックスを選択/解除
      if (group.every(option => newFilters[index].selectedOptions.includes(option))) {
        newFilters[index].selectedOptions = newFilters[index].selectedOptions.filter(option => !group.includes(option));
      } else {
        newFilters[index].selectedOptions = [...newFilters[index].selectedOptions, ...group.filter(option => !newFilters[index].selectedOptions.includes(option))];
      }
    } else {
      // 単一のチェックボックスを選択/解除
      newFilters[index].selectedOptions = newFilters[index].selectedOptions.includes(value)
        ? newFilters[index].selectedOptions.filter(option => option !== value)
        : [...newFilters[index].selectedOptions, value];
    }
    setFilters(newFilters);
  };

  // 銘柄の選択を処理する関数
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

  // 日付をフォーマットする関数
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
    // 性別パラメータを作成
    const genderParams = genderOptions
      .filter(option => filter.selectedOptions.includes(option))
      .map(option => (option === "男性" ? "0" : "1"))
      .map(gender => `gender=${gender}`)
      .join('&');

    // 年齢パラメータを作成
    const ageParams = ageOptions
      .filter(option => filter.selectedOptions.includes(option))
      .map(age => `age_group=${age.split('代')[0]}`)
      .join('&');

    // クエリパラメータを作成
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

    // レーダーチャートのラベル
    const labels = [
      'しっかりとした苦味', '飲みごたえ', '濃厚な味わい', 'まろやか', 'やわらかな苦味', 'フルーティな味わい', '爽快なキレ', '後味（余韻）がよい'
    ];

    // データ取得
    const values = labels.map((label, i) => filter.fetchedData.find((item: any) => item.item_id === (i + 1))?.average_score || 0);

    // 選択されたフィルタを文字列に変換
    const selectedFilters = [
      filter.selectedBrand ? `銘柄: ${brandOptions.find(opt => opt.value === filter.selectedBrand)?.label}` : '',
      filter.selectedOptions.length ? `性別: ${filter.selectedOptions.join(', ')}` : '',
      filter.startDate ? `開始日: ${formatDate(filter.startDate)}` : '',
      filter.endDate ? `終了日: ${formatDate(filter.endDate)}` : '',
    ].filter(Boolean).join(' | ');

    // レーダーチャートデータを更新
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
