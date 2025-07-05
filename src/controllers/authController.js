const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET = 'your-secret-key-123'; // 随便写一个复杂字符串

// 注册功能
exports.register = async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // 检查手机号是否已注册
    if (await User.findOne({ phone })) {
      return res.status(400).json({ error: '手机号已注册' });
    }

    // 创建用户
    const user = await User.create({ phone, password });
    
    // 生成Token（有效期1天）
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1d' });

    res.status(201).json({ 
      success: true,
      token,
      user: { phone: user.phone }
    });
  } catch (err) {
    res.status(500).json({ error: '注册失败' });
  }
};

// 登录功能
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log('请求数据：',phone, password);

    // 查找用户（强制包含密码字段）
    const user = await User.findOne({ phone }).select('+password');
    console.log('查询结果：', user?'用户存在' : '用户不存在');

    if (!user) {
      return res.status(401).json({ error: '手机号或密码错误' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('密码对比结果：', isMatch);
    console.log('数据库密码：', user.password);
    console.log('输入密码：', password);

    if (!isMatch) {
      return res.status(401).json({ error: '手机号或密码错误' });
    }

    // 生成Token
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1d' });

    res.json({ 
      success: true,
      token,
      user: { phone: user.phone }
    });
  } catch (err) {
    console.error('登录异常:', err.stack);
    res.status(500).json({ error: '登录失败' });
  }
};