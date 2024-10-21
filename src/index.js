import React from 'react';
import ReactDOM from 'react-dom'; // 修改为 react-dom
import { BrowserRouter as Router } from 'react-router-dom'; // 导入 Router
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root') // 将渲染目标作为第二个参数传入
);

// 如果您想在应用中开始测量性能，可以传递一个函数来记录结果
// （例如：reportWebVitals(console.log)）
// 或者发送到分析端点。了解更多信息： https://bit.ly/CRA-vitals
reportWebVitals();
