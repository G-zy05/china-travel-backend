const mongoose = require('mongoose');

// 连接MongoDB（数据库名china_travel会自动创建）
mongoose.connect('mongodb://localhost:27017/china_travel')
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('数据库连接失败:', err));

module.exports = mongoose;