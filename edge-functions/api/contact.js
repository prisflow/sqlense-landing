// Edge Function — 联系表单 → SES 邮件
// 环境变量：SES_SECRET_ID, SES_SECRET_KEY, SES_REGION, SES_FROM, SES_TO

const SERVICE = "ses";
const VERSION = "2020-10-16";
const ALGORITHM = "TC3-HMAC-SHA256";

export async function onRequestPost(context) {
  const req = context.request;
  const env = context.env;
  const log = [];

  function debug(msg, data) {
    const line = data ? `${msg}: ${JSON.stringify(data)}` : msg;
    log.push(line);
    console.log(line);
  }

  try {
    debug("收到表单请求");

    const form = await req.formData();
    const name = (form.get("name") || "").trim();
    const email = (form.get("email") || "").trim();
    const institution = (form.get("institution") || "").trim();
    const message = (form.get("message") || "").trim();

    if (!name || !email) {
      debug("缺少必填字段", { name: !!name, email: !!email });
      return json({ error: "姓名和邮箱必填" }, 400, log);
    }

    debug("表单字段", { name, email, institution });

    const { SES_SECRET_ID, SES_SECRET_KEY, SES_REGION, SES_FROM, SES_TO } = env;
    const region = SES_REGION || "ap-guangzhou";
    debug("环境变量", {
      hasId: !!SES_SECRET_ID,
      hasKey: !!SES_SECRET_KEY,
      region,
      from: SES_FROM,
      to: SES_TO,
    });

    if (!SES_SECRET_ID || !SES_SECRET_KEY || !SES_FROM || !SES_TO) {
      return json({ error: "SES 环境变量配置不完整" }, 500, log);
    }

    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000).toString();
    const date = now.toISOString().slice(0, 10).replace(/-/g, "");

    const payload = {
      FromEmailAddress: SES_FROM,
      Destination: { ToAddresses: [SES_TO] },
      ReplyToEmailAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: `[SQLense 咨询] ${name} — ${institution || "个人"}` },
          Body: { Text: { Data: `姓名: ${name}\n邮箱: ${email}\n单位: ${institution || "未填写"}\n留言:\n${message}` } },
        },
      },
    };

    const body = JSON.stringify(payload);
    debug("SES 请求体", payload);

    // TC3-HMAC-SHA256 签名
    const signedHeaders = "content-type;host";
    const canonicalHeaders = "content-type:application/json\nhost:ses.tencentcloudapi.com\n";
    const hashedPayload = await sha256(body);
    const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;
    const credentialScope = `${date}/${region}/${SERVICE}/tc3_request`;
    const stringToSign = `${ALGORITHM}\n${timestamp}\n${credentialScope}\n${await sha256(canonicalRequest)}`;

    const sk1 = await hmac(`TC3${SES_SECRET_KEY}`, date);
    const sk2 = await hmac(sk1, region);
    const sk3 = await hmac(sk2, SERVICE);
    const sk4 = await hmac(sk3, "tc3_request");
    const signature = await hmacHex(sk4, stringToSign);

    debug("签名完成", { timestamp, date, credentialScope, signature: signature.slice(0, 16) + "..." });

    const authorization = `${ALGORITHM} Credential=${SES_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const sesRes = await fetch("https://ses.tencentcloudapi.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Host: "ses.tencentcloudapi.com",
        Authorization: authorization,
        "X-TC-Action": "SendEmail",
        "X-TC-Version": VERSION,
        "X-TC-Region": region,
        "X-TC-Timestamp": timestamp,
      },
      body,
    });

    const sesBody = await sesRes.text();
    debug("SES 响应", { status: sesRes.status, body: sesBody });

    if (!sesRes.ok) {
      return json({ ok: false, error: sesBody }, 500, log);
    }

    debug("发送成功");
    return json({ ok: true }, 200, log);
  } catch (e) {
    debug("异常", { message: e.message, stack: e.stack });
    return json({ error: e.message }, 500, log);
  }
}

function json(data, status, log) {
  data._debug = log;
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function sha256(data) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return hex(h);
}

async function hmac(key, data) {
  const alg = { name: "HMAC", hash: "SHA-256" };
  const k = typeof key === "string" ? new TextEncoder().encode(key) : key;
  const cryptoKey = await crypto.subtle.importKey("raw", k, alg, false, ["sign"]);
  return await crypto.subtle.sign(alg, cryptoKey, new TextEncoder().encode(data));
}

async function hmacHex(key, data) {
  return hex(await hmac(key, data));
}

function hex(buf) {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
