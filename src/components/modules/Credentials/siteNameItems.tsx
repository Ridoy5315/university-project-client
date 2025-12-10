"use client";

import { SelectItem } from "@/components/ui/select";

// Continue adding sites here easily
export const siteNameItems = [
  { value: "WECHAT", label: "WeChat (微信)" },
  { value: "QQ", label: "QQ" },
  { value: "DOUYIN", label: "Douyin (抖音)" },
  { value: "GITHUB", label: "GitHub" },
  { value: "ALIPAY", label: "Alipay (支付宝)" },
  { value: "YOUDAO", label: "Youdao (有道)" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "GMAIL", label: "Gmail" },
  { value: "TAOBAO", label: "Taobao (淘宝)" },
  { value: "DINGTALK", label: "DingTalk (钉钉)" },
  { value: "FEISHU", label: "Feishu / Lark (飞书)" },
  { value: "DISCORD", label: "Discord" },
  { value: "GOOGLE", label: "Google" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "DIDI", label: "DiDi (滴滴出行)" },
  { value: "VERCEL", label: "Vercel" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "TWITTER", label: "Twitter" },
  { value: "ALIBABA", label: "Alibaba" },
  { value: "ALIEXPRESS", label: "AliExpress" },
  { value: "PAYPAL", label: "PayPal" },
  { value: "STRIPE", label: "Stripe" },
];

export const RenderSiteNameItems = () => {
  return (
    <>
      {siteNameItems.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </>
  );
};
