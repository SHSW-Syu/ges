const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 替换为你的 MySQL 用户名
    password: 'poiulkjm123456Z', // 替换为你的 MySQL 密码
    database: 'ges' // 替换为你的数据库名称
});

// 连接到数据库
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


// 测试插入数据的路由
app.post('/receive', (req, res) => {
  const { buyerId, product1Quantity, product2Quantity, totalPrice} = req.body;

  // 插入数据到 orders 表
  const query = 'INSERT INTO orders (buyer_id, product1_quantity, product2_quantity, total_price) VALUES (?, ?, ?, ?)';
  
  db.query(query, [buyerId, product1Quantity, product2Quantity, totalPrice], (error, results) => {
      if (error) {
          console.error('Error inserting order:', error);
          return res.status(500).json({ message: 'Error inserting order', error });
      }
      res.status(200).json({ message: 'Order received successfully!', results });
  });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//app.listen(port, '0.0.0.0', () => { // 允许外部访问
//console.log(`Server running at http://0.0.0.0:${port}`); // 更新为允许外部访问的地址
//});