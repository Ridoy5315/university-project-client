"use client";

import { SelectItem } from "@/components/ui/select";

// Continue adding sites here easily
export const siteNameItems = [
  { value: "WeChat", label: "WeChat" },
  { value: "QQ", label: "QQ" },
  { value: "Douyin", label: "Douyin" },
  { value: "GitHub", label: "GitHub" },
  { value: "Alipay", label: "Alipay" },
  { value: "Youdao", label: "Youdao" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Facebook", label: "Facebook" },
  { value: "Gmail", label: "Gmail" },
  { value: "Taobao", label: "Taobao" },
  { value: "DingTalk", label: "DingTalk" },
  { value: "Feishu", label: "Feishu" },
  { value: "Discord", label: "Discord" },
  { value: "Google", label: "Google" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "DIDI", label: "DIDI" },
  { value: "Vercel", label: "Vercel" },
  { value: "Instagram", label: "Instagram" },
  { value: "Twitter", label: "Twitter" },
  { value: "Alibaba", label: "Alibaba" },
  { value: "AliExpress", label: "AliExpress" },
  { value: "PayPal", label: "PayPal" },
  { value: "Stripe", label: "Stripe" },
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
