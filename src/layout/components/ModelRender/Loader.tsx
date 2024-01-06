import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { Progress } from 'antd';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loading">
        <h1>Loading...</h1>
        <Progress
          type="circle"
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
          percent={Number(progress.toFixed(2))}
        />
      </div>
    </Html>
  );
}
