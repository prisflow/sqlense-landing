// Edge Function — 联系表单 → SES 邮件
// 需在 EdgeOne 控制台设置环境变量（全部必填）：
//   SES_SECRET_ID     — 腾讯云 API 密钥 ID
//   SES_SECRET_KEY    — 腾讯云 API 密钥 Key
//   SES_REGION        — 可用区（如 ap-guangzhou）
//   SES_FROM          — 发件地址（需在 SES 验证过）
//   SES_TO            — 收件地址

const SERVICE = "ses";
const VERSION = "2020-10-16";
const ALGORITHM = "TC3-HMAC-SHA256";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response(null, { status: 405 });

    const form = await request.formData();
    const name = (form.get("name") || "").trim();
    const email = (form.get("email") || "").trim();
    const institution = (form.get("institution") || "").trim();
    const message = (form.get("message") || "").trim();

    if (!name || !email) return new Response(JSON.stringify({ error: "姓名和邮箱必填" }), { status: 400 });

    const { SES_SECRET_ID, SES_SECRET_KEY, SES_REGION, SES_FROM, SES_TO } = env;
    if (!SES_SECRET_ID || !SES_SECRET_KEY || !SES_REGION || !SES_FROM || !SES_TO) {
      return new Response(JSON.stringify({ error: "配置不完整" }), { status: 500 });
    }

    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000).toString();
    const date = now.toISOString().slice(0, 10).replace(/-/g, "");
    const body = JSON.stringify({
      FromEmailAddress: SES_FROM,
      Destination: { ToAddresses: [SES_TO] },
      ReplyToEmailAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: `[SQLense 咨询] ${name} — ${institution || "个人"}` },
          Body: { Text: { Data: `姓名: ${name}\n邮箱: ${email}\n单位: ${institution || "未填写"}\n留言:\n${message}` } },
        },
      },
    });

    const signedHeaders = "content-type;host";
    const canonicalHeaders = `content-type:application/json\nhost:ses.tencentcloudapi.com\n`;
    const hashedPayload = await sha256(body);
    const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;
    const credentialScope = `${date}/${SES_REGION}/${SERVICE}/tc3_request`;
    const stringToSign = `${ALGORITHM}\n${timestamp}\n${credentialScope}\n${await sha256(canonicalRequest)}`;

    const k = async (k, d) => await hmac(k, d);
    const sk = await k(await k(await k(await k(`TC3${SES_SECRET_KEY}`, date), SES_REGION), SERVICE), "tc3_request");
    const signature = await hmacHex(sk, stringToSign);

    const authorization = `${ALGORITHM} Credential=${SES_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const params = new URLSearchParams({ Action: "SendEmail", Version: VERSION, Region: SES_REGION });
    const res = await fetch(`https://ses.tencentcloudapi.com/?${params}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Host: "ses.tencentcloudapi.com", Authorization: authorization, "X-TC-Timestamp": timestamp },
      body,
    });

    return new Response(JSON.stringify({ ok: res.ok }), { status: res.ok ? 200 : 500 });
  },
};

async function sha256(data) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(key, data) {
  const alg = { name: "HMAC", hash: "SHA-256" };
  const k = typeof key === "string" ? new TextEncoder().encode(key) : key;
  return await crypto.subtle.sign(alg, await crypto.subtle.importKey("raw", k, alg, false, ["sign"]), new TextEncoder().encode(data));
}

async function hmacHex(key, data) {
  const s = await hmac(key, data);
  return Array.from(new Uint8Array(s)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
