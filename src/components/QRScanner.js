import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ applyDiscount }) => {
  const [scanResult, setScanResult] = useState(null);
  const [showMessage, setShowMessage] = useState(false);  // 控制提示消息的显示状态

  const handleScan = (result) => {
    if (result) {
      const scannedCode = result.text;
      console.log("Scanned Code:", scannedCode);
      setScanResult(scannedCode);
      applyDiscount(scannedCode);  // 根据扫描结果应用折扣
      
      // 显示提示消息
      setShowMessage(true);

      // 在3秒后隐藏提示消息
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrReader
  onResult={(result, error) => {
    if (result) {
      handleScan(result);
    }
    if (error) {
      handleError(error);
    }
  }}
  constraints={{ facingMode: 'environment' }}  // 使用后置摄像头
  style={{ width: '100%' }}
/>

      {scanResult && (
        <div>
          <h3>Scanned Result:</h3>
          <p>{scanResult}</p>
        </div>
      )}

      {/* 扫描成功的提示消息 */}
      {showMessage && (
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          backgroundColor: '#4caf50',
          color: 'white',
          borderRadius: '5px',
          opacity: showMessage ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 1000
        }}>
          Scanned successfully!
        </div>
      )}
    </div>
  );
};

export default QRScanner;

