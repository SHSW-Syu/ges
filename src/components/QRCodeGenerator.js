// src/components/QRCodeGenerator.js
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState(''); // 存储输入内容

  return (
    <div>
      <h2>Generate QR Code</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text to generate QR"
      />
      <div>
        {inputValue && (
          <QRCodeCanvas value={inputValue} size={256} />
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;




