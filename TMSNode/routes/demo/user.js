const express = require('express');
const router = express.Router();

const user = require('../../model/demo/user')
const { sendVerificationCode } = require('../../utils/sms');

router.post('/send-code', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: '手机号不能为空' });
  }

  // 生成6位数字验证码
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // 发送短信验证码
    const result = await sendVerificationCode(phone, code);

    // 这里通常存验证码及失效时间（如写入redis或数据库）用于后续校验手机号和验证码

    res.json({
      message: '短信发送成功',
      data: result
    });
  } catch (error) {
    console.error('发送短信失败：', error);
    res.status(500).json({
      message: '短信发送失败',
      error: error.message
    });
  }
});

router.post('/list', async (req, res, next) => {
  const data = await user.findAll()
  res.json({
    code: 200,
    msg: '查询成功',
    data
  })
})



module.exports = router