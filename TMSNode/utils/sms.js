// sms_verify.js
require('dotenv').config();

const pkg = require('@alicloud/dypnsapi20170525');
const Dypnsapi20170525 = pkg.default || pkg;
const Models = pkg.Models || (pkg.default && pkg.default.Models);
const OpenApi = require('@alicloud/openapi-client');
const Credential = require('@alicloud/credentials').default || require('@alicloud/credentials');
const TeaUtil = require('@alicloud/tea-util');

if (!Dypnsapi20170525) {
  throw new Error('@alicloud/dypnsapi20170525 导入失败，请检查安装');
}

function createClient() {
  const credential = new Credential({
    type: 'access_key',
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
  });

  const config = new OpenApi.Config({
    credential,
    endpoint: 'dypnsapi.aliyuncs.com',
    // regionId: 'cn-hangzhou', // 如需指定 region 可打开
  });

  return new Dypnsapi20170525(config);
}

const client = createClient();

/**
 * 发送号码认证短信验证码（号码认证服务）
 * 使用 Models.SendSmsVerifyCodeRequest + TeaUtil.RuntimeOptions
 */
async function sendVerificationCode(phoneNumber, code, min = '5') {
  if (!phoneNumber) throw new Error('phoneNumber 不能为空');
  if (!code) throw new Error('code 不能为空');

  // 确保有请求构造类
  const SendSmsVerifyCodeRequest =
    (Models && Models.SendSmsVerifyCodeRequest) ||
    pkg.SendSmsVerifyCodeRequest ||
    (pkg.default && pkg.default.SendSmsVerifyCodeRequest);

  if (!SendSmsVerifyCodeRequest) {
    // 如果确实找不到构造器，打印导出用于调试
    console.error('包导出列表:', Object.keys(pkg));
    throw new Error('无法找到 SendSmsVerifyCodeRequest 构造器，请确认包版本或导出位置');
  }

  // 按照号码认证 SDK 的字段（驼峰小写开头）
  const request = new SendSmsVerifyCodeRequest({
    phoneNumber,
    templateCode: process.env.SMS_TEMPLATE_CODE || '100001',   // 替换你的模板
    signName: process.env.SMS_SIGN_NAME || '速通互联验证码',    // 替换你的签名
    templateParam: JSON.stringify({ code: String(code), min: String(min) }),
  });

  // runtime options 来自 tea-util
  const runtime = new TeaUtil.RuntimeOptions({}); // 可在此添加超时等项

  try {
    // 调用带 Options 的接口，确保传入的是 request 实例
    const resp = await client.sendSmsVerifyCodeWithOptions(request, runtime);
    return resp;
  } catch (err) {
    // 打印更详细的错误信息便于定位
    console.error('sendSmsVerifyCodeWithOptions 报错:', err && err.message ? err.message : err);
    throw err;
  }
}

// 测试用示例，直接运行文件会触发
if (require.main === module) {
  (async () => {
    try {
      const r = await sendVerificationCode('13800000000', '123456', '5');
      console.log('发送成功，返回：', r);
    } catch (e) {
      console.error('发送失败：', e);
    }
  })();
}

module.exports = { sendVerificationCode };