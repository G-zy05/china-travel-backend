const express = require('express');
const cors = require('cors');
require('./config/db'); // 连接数据库
const authRoutes = require('./routes/authRoutes');

const app = express();

// 中间件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 路由
app.use('/api/auth', authRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器错误' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
});