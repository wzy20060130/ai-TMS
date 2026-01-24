// routes/sendAuth.js
const express = require('express');

function createSendAuthRouter({ client, redis, config }) {
  const router = express.Router();
  const {
    ALIYUN_SMS_REGION,
    SIGN_NAME = '速通互联验证码', // 根据控制台签名调整
    TEMPLATE_CODE = '100001',
    SEND_LIMIT_WINDOW = 60,
    SEND_LIMIT_MAX = 3,
    REQUEST_ID_TTL = 5 * 60
  } = config;

  function validatePhone(phone) { return /^\d{10,15}$/.test(String(phone).trim()); }

  router.post('/', async (req, res) => {
    try {
      const { phone } = req.body;
      if (!phone || !validatePhone(phone)) return res.status(400).json({ success: false, message: '手机号不合法' });

      const limitKey = `auth:limit:${phone}`;
      const cnt = await redis.incr(limitKey);
      if (cnt === 1) await redis.expire(limitKey, SEND_LIMIT_WINDOW);
      if (cnt > SEND_LIMIT_MAX) return res.status(429).json({ success: false, message: '发送太频繁' });

      // templateParam: 如果使用阿里云的验证码服务，通常传 '{"code":"##code##","min":"5"}'
      const templateParam = JSON.stringify({ code: '##code##', min: '5' });

      const params = {
        RegionId: ALIYUN_SMS_REGION,
        signName: SIGN_NAME,        // 注意大小写按文档
        templateCode: TEMPLATE_CODE,
        phoneNumber: String(phone),
        templateParam // example: '{"code":"##code##","min":"5"}'
      };
      const requestOption = { method: 'POST' };

      // 请以控制台/SDK 文档确认 Action 名。示例使用 SendSmsVerifyCode
      const result = await client.request('SendSmsVerifyCode', params, requestOption);

      if (result && (result.Code === 'OK' || result.code === 'OK' || result.Success === true)) {
        const requestId = result.RequestId || result.requestId || null;
        if (requestId) {
          await redis.set(`auth:req:${phone}`, requestId, 'EX', REQUEST_ID_TTL);
        }
        return res.json({ success: true, data: result });
      } else {
        // 失败时可减计数或记录
        return res.status(500).json({ success: false, message: '触发认证失败', detail: result });
      }
    } catch (err) {
      console.error('sendAuth error', err);
      return res.status(500).json({ success: false, message: '服务器内部错误' });
    }
  });

  return router;
}

module.exports = createSendAuthRouter;