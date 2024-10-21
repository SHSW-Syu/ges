import React from 'react';
import ReactDOM from 'react-dom/client'; // 使用 react-dom/client
import { BrowserRouter as Router } from 'react-router-dom'; // 导入 Router
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // 创建根元素
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// 如果您想在应用中开始测量性能，可以传递一个函数来记录结果
// （例如：reportWebVitals(console.log)）
// 或者发送到分析端点。了解更多信息： https://bit.ly/CRA-vitals
reportWebVitals();
