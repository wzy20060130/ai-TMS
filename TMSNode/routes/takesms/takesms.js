// routes/verifyAuth.js
const express = require('express');

function createVerifyAuthRouter({ client, redis, config }) {
  const router = express.Router();
  const { ALIYUN_SMS_REGION, TEMPLATE_CODE = '100001' } = config;

  function validatePhone(phone) { return /^\d{10,15}$/.test(String(phone).trim()); }

  router.post('/', async (req, res) => {
    try {
      const { phone, code, requestId } = req.body;
      if (!phone || !validatePhone(phone) || !code) return res.status(400).json({ success: false, message: '参数缺失或不合法' });

      let reqId = requestId;
      if (!reqId) reqId = await redis.get(`auth:req:${phone}`);

      const params = {
        RegionId: ALIYUN_SMS_REGION,
        phoneNumber: String(phone),
        verifyCode: String(code),
        templateCode: TEMPLATE_CODE,
        ...(reqId ? { requestId: reqId } : {})
      };
      const requestOption = { method: 'POST' };

      // 请以控制台/SDK 文档确认 Action 名。示例使用 VerifySmsVerifyCode
      const result = await client.request('VerifySmsVerifyCode', params, requestOption);

      // 根据真实返回结构判断通过条件
      if (result && (result.Code === 'OK' || result.code === 'OK' || result.VerifyResult === 'PASS' || result.verifyResult === 'PASS' || result.Success === true)) {
        // 标记已认证（写 Redis 或持久化到 DB）
        const verifiedKey = `phone:verified:${phone}`;
        await redis.set(verifiedKey, JSON.stringify({ verifiedAt: Date.now(), detail: result }), 'EX', 30 * 24 * 3600);
        await redis.del(`auth:req:${phone}`);
        return res.json({ success: true, data: result });
      } else {
        return res.status(400).json({ success: false, message: '校验未通过', detail: result });
      }
    } catch (err) {
      console.error('verifyAuth error', err);
      return res.status(500).json({ success: false, message: '服务器内部错误' });
    }
  });

  router.get('/status', async (req, res) => {
    try {
      const phone = req.query.phone;
      if (!phone || !validatePhone(phone)) return res.status(400).json({ success: false, message: '手机号不合法' });
      const v = await redis.get(`phone:verified:${phone}`);
      return res.json({ success: true, verified: !!v, info: v ? JSON.parse(v) : null });
    } catch (err) {
      console.error('status err', err);
      return res.status(500).json({ success: false, message: '服务器内部错误' });
    }
  });

  return router;
}

module.exports = createVerifyAuthRouter;