const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 定义用户字段规则
const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^1[3-9]\d{9}$/ // 手机号正则验证
  },
  password: {
    type: String,
    required: true,
    select: false // 查询时不返回密码
  }
});

// 保存前自动加密密码
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('加密结果:', this.password);
  next();
});

module.exports = mongoose.model('User', UserSchema);