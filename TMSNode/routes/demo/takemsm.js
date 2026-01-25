// verify-api-single.js （或替换你的路由文件）
require('dotenv').config();
const express = require('express');
const pkg = require('@alicloud/dypnsapi20170525');
const Dypnsapi20170525 = pkg.default || pkg;
const Models = pkg.Models || (pkg.default && pkg.default.Models);
const OpenApi = require('@alicloud/openapi-client');
const Credential = require('@alicloud/credentials').default || require('@alicloud/credentials');
const TeaUtil = require('@alicloud/tea-util');

const router = express.Router();
router.use(express.json());

function createClient() {
  const cred = new Credential({
    type: 'access_key',
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
  });
  const config = new OpenApi.Config({ credential: cred, endpoint: 'dypnsapi.aliyuncs.com' });
  return new Dypnsapi20170525(config);
}
const client = createClient();

// 辅助：把方法名转成可能的 Model 类名，比如 verifySmsCode -> VerifySmsCodeRequest
function methodNameToModelName(methodName) {
  const base = methodName.replace(/WithOptions$/i, '');
  // 把 camelCase 转 PascalCase（简单实现）
  const pascal = base.replace(/(^.|[A-Z])/g, (m, idx) => (idx === 0 ? m.toUpperCase() : m));
  return `${pascal}Request`;
}

// 根据 methodName 与 payload 构造要传入 SDK 的 request（优先使用 Models 中的 Request 类）
function buildRequestForMethod(methodName, payload) {
  const modelName = methodNameToModelName(methodName);
  if (Models && Models[modelName]) {
    try {
      return new Models[modelName](payload);
    } catch (e) {
      // 如果构造失败，回退为原始 payload（仍打印调试信息）
      console.warn('构造 Models 实例失败，回退为普通对象，modelName=', modelName, 'err=', e && e.message);
      return payload;
    }
  }
  // Models 中没有对应类，直接返回普通对象
  return payload;
}

// 假设 pkg, client, TeaUtil 已在文件顶部定义
router.post('/', async (req, res) => {
  try {
    const { phoneNumber, verifyCode } = req.body;
    if (!phoneNumber || !verifyCode) {
      return res.status(400).json({ ok: false, message: 'phoneNumber 和 verifyCode 为必填项' });
    }

    // 获取 SDK 中的 Request 类（兼容几种导出形式）
    const RequestClass =
      (pkg && pkg.Models && pkg.Models.CheckSmsVerifyCodeRequest) ||
      (pkg && pkg.CheckSmsVerifyCodeRequest) ||
      (pkg && pkg.default && pkg.default.Models && pkg.default.Models.CheckSmsVerifyCodeRequest) ||
      (pkg && pkg.default && pkg.default.CheckSmsVerifyCodeRequest);

    let requestObj;
    const payload = { phoneNumber, verifyCode };

    if (RequestClass) {
      try {
        requestObj = new RequestClass(payload);
      } catch (e) {
        console.warn('用 CheckSmsVerifyCodeRequest 构造实例失败，回退为普通对象，err=', e && e.message);
        requestObj = payload;
        // 临时给 payload 添上 validate（仅调试用）
        if (typeof requestObj.validate !== 'function') requestObj.validate = () => {};
      }
    } else {
      // 没找到类时，临时添上 validate 保证 SDK 不抛 "request.validate is not a function"
      requestObj = payload;
      if (typeof requestObj.validate !== 'function') requestObj.validate = () => {};
      console.warn('未找到 CheckSmsVerifyCodeRequest 类，已为 payload 添加临时 validate()（仅用于本地调试）');
    }

    const runtime = new TeaUtil.RuntimeOptions({});
    const resp = await client.checkSmsVerifyCodeWithOptions(requestObj, runtime);

    console.log('校验成功，阿里云返回：', resp);
    // 根据 resp 精确判断是否成功：运行一次打印 resp 后再改写这里的判定为精确字段
    let ok = false;
    if (resp && (resp.code === 'OK' || resp.success === true || resp.statusCode === 200)) ok = true;
    const body = resp && (resp.body || resp.data || resp);
    // 启发式判断（临时）
    if (body && (body.code === 'OK' || body.success === true)) ok = true;

    return res.json({ ok, resp });
  } catch (err) {
    // 如果是阿里云的验证失败（isv.ValidateFail），返回 400 并把诊断信息写入日志/返回给前端（生产环境注意不要泄露敏感信息）
    console.error('调用校验接口失败:', err && (err.stack || err));

    const errMessage = err && err.message;
    const errData = (err && (err.data || err.response || err.body)) || null;

    if (errMessage && errMessage.includes('isv.ValidateFail')) {
      // 验证不通过（验证码错误/过期等）
      console.warn('验证码校验被拒绝：', errMessage, ' data=', errData);
      return res.status(400).json({
        ok: false,
        message: '验证码校验失败（可能错误或已过期）',
        // 调试时可返回更多字段，生产中应只返回简短信息
        errorDetails: {
          message: errMessage,
          data: errData
        }
      });
    }

    // 其它错误（如鉴权/配额/网络等）
    return res.status(500).json({
      ok: false,
      message: '验证服务调用失败（详见后端日志）',
      errorDetails: {
        message: errMessage,
        data: errData
      }
    });
  }
});
module.exports = router;