// Edge Function — 联系表单 → SES 邮件
// 环境变量：SES_SECRET_ID, SES_SECRET_KEY, SES_REGION, SES_FROM, SES_TO, SES_TEMPLATE_ID

const SERVICE = "ses";
const VERSION = "2020-10-02";
const ALGORITHM = "TC3-HMAC-SHA256";

export async function onRequestPost(context) {
  const req = context.request;
  const env = context.env;

  try {
    const form = await req.formData();
    const name = (form.get("name") || "").trim();
    const email = (form.get("email") || "").trim();
    const institution = (form.get("institution") || "").trim();
    const message = (form.get("message") || "").trim();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "姓名和邮箱必填" }), { status: 400 });
    }

    const { SES_SECRET_ID, SES_SECRET_KEY, SES_REGION, SES_FROM, SES_TO, SES_TEMPLATE_ID } = env;
    const region = SES_REGION || "ap-hongkong";

    if (!SES_SECRET_ID || !SES_SECRET_KEY || !SES_FROM || !SES_TO || !SES_TEMPLATE_ID) {
      return new Response(JSON.stringify({ error: "配置不完整" }), { status: 500 });
    }

    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000).toString();
    const date = now.toISOString().slice(0, 10);

    const payload = {
      FromEmailAddress: SES_FROM,
      ReplyToAddresses: email,
      Subject: `[SQLense 咨询] ${name} — ${institution || "个人"}`,
      Destination: [SES_TO],
      Template: {
        TemplateID: parseInt(SES_TEMPLATE_ID, 10),
        TemplateData: JSON.stringify({ name, email, institution: institution || "未填写", message }),
      },
    };

    const body = JSON.stringify(payload);
    const signedHeaders = "content-type;host;x-tc-action";
    const canonicalHeaders = "content-type:application/json\nhost:ses.tencentcloudapi.com\nx-tc-action:sendemail\n";
    const hashedPayload = await sha256(body);
    const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;
    const credentialScope = `${date}/${SERVICE}/tc3_request`;
    const stringToSign = `${ALGORITHM}\n${timestamp}\n${credentialScope}\n${await sha256(canonicalRequest)}`;

    const sk = await hmac(await hmac(await hmac(`TC3${SES_SECRET_KEY}`, date), SERVICE), "tc3_request");
    const signature = await hmacHex(sk, stringToSign);

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
    const sesJson = JSON.parse(sesBody);
    const hasError = sesJson?.Response?.Error;

    if (hasError) {
      return new Response(JSON.stringify({ error: hasError.Message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
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
