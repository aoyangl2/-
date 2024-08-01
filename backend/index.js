const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// 使用 CORS 中间件并允许指定的源
const corsOptions ={
    origin:'http://120.26.81.229:5000', 
    credentials:true,            //access-control-allow-credentials:true
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], // 允许的HTTP方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    optionSuccessStatus:200
    
}
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

// 处理预检请求
app.options('*', cors());

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: '120.26.81.229',
    user: 'root',
    password: 'Yuanqiyiliao2024!',
    database: 'yuanqiyiliao'
});

// 连接到 MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL 连接成功...');
});

// 处理用户注册
app.post('/api/register', (req, res) => {
    const user = req.body;
    const query = 'INSERT INTO register_info SET ?';
    // const query = 'SELECT * FROM register_info';

    // console.log(user);
    db.query(query, user, (err, result) => {
        if (err) {
            console.log(query);
            console.log(user)
            return res.status(300).send(err);
        }
        res.send('用户注册成功');
    });
});

// 获取所有用户（用于管理页面）
app.get('/api/admin', (req, res) => {
    const query = 'SELECT * FROM register_info WHERE status = "active"';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// 删除所有用户
app.delete('/delete-all', (req, res) => {
    const query = 'UPDATE register_info SET status = "inactive" WHERE status = "active"';
    db.query(query, (err, result) => {
        if (err) {
            console.error('删除行时出错:', err);
            return res.status(500).send('删除行时出错');
        }
        res.send('所有行已成功删除');
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length > 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    });
  });


// 示例注册端点（如果有重复，可删除）
// app.post('/api/register', (req, res) => {
//     res.status(200).send("注册成功");
// });

app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});
