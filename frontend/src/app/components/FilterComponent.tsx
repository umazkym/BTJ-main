"use client";

import React, { ChangeEvent } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { RadarData, Filter, brandOptions, genderOptions, ageOptions } from './types';
import RadarChartComponent from './RadarChartComponent';

// フィルターコンポーネント
const FilterComponent: React.FC<{ filter: Filter, index: number, handleCheckboxChange: any, handleBrandChange: any, handleDateChange: any, updateRadarData: any }> = ({
  filter, index, handleCheckboxChange, handleBrandChange, handleDateChange, updateRadarData
}) => (
  <div key={index} className='flex flex-col lg:flex-row mb-10 bg-white shadow-lg rounded-lg'>
    <div className='w-full lg:w-1/2 p-4'>
      <h2 className='font-bold text-xl mb-4'>銘柄</h2>
      <Select
        options={brandOptions}
        instanceId={`select-brand-${index}`}
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
        <RadarChartComponent radarData={filter.radarData} />
      </div>
    </div>
  </div>
);

export default FilterComponent;
