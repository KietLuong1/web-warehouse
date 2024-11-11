import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/plots';

interface DataType {
  type: string;
  value: number;
}

const PieChart: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { type: 'Test 1', value: 27 },
        { type: 'Test 2', value: 22 },
        { type: 'Test 3', value: 18 },
        { type: 'Test 4', value: 12 },
        { type: 'Test 5', value: 10 },
        { type: 'Test 6', value: 4 },
        { type: 'Test 7', value: 7 },
      ]);
    }, 1000);
  }, []);

  const config: PieConfig = {
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };

  return <Pie {...config} />;
};

export default PieChart;
