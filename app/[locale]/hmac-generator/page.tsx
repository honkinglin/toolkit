"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCopy } from "@/hooks/use-copy";
import { 
  generateHMAC,
  algorithmOptions,
  encodingOptions,
  type HmacAlgorithm,
  type Encoding
} from "@/lib/hmac-utils";

export default function HMACGenerator() {
  const t = useTranslations("hmacGenerator");

  // 状态管理
  const [plainText, setPlainText] = useState("");
  const [secret, setSecret] = useState("");
  const [hashFunction, setHashFunction] = useState<HmacAlgorithm>("SHA256");
  const [encoding, setEncoding] = useState<Encoding>("Hex");

  // 计算 HMAC
  const hmac = useMemo(() => {
    return generateHMAC(plainText, secret, hashFunction, encoding);
  }, [plainText, secret, hashFunction, encoding]);

  // 复制功能
  const { copy } = useCopy({ 
    source: hmac, 
    successMessage: t("hmacCopied")
  });

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="space-y-6">
          {/* 纯文本输入 */}
          <div className="space-y-2">
            <Label htmlFor="plain-text">{t("plainText")}</Label>
            <Textarea
              id="plain-text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder={t("plainTextPlaceholder")}
              className="min-h-[80px] font-mono text-sm"
              rows={3}
              autoFocus
            />
          </div>

          {/* 密钥输入 */}
          <div className="space-y-2">
            <Label htmlFor="secret-key">{t("secretKey")}</Label>
            <div className="relative">
              <Input
                id="secret-key"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder={t("secretKeyPlaceholder")}
                className="font-mono pr-10"
              />
              {secret && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSecret("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* 哈希函数和编码选择 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 哈希函数选择 */}
            <div className="space-y-2">
              <Label>{t("hashingFunction")}</Label>
              <Select value={hashFunction} onValueChange={(value) => setHashFunction(value as HmacAlgorithm)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an hashing function..." />
                </SelectTrigger>
                <SelectContent>
                  {algorithmOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 输出编码选择 */}
            <div className="space-y-2">
              <Label>{t("outputEncoding")}</Label>
              <Select value={encoding} onValueChange={(value) => setEncoding(value as Encoding)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the result encoding..." />
                </SelectTrigger>
                <SelectContent>
                  {encodingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* HMAC 结果 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="hmac-result">{t("hmacResult")}</Label>
              <Button 
                variant="outline" 
                size="sm"
                onClick={copy}
                disabled={!hmac}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              id="hmac-result"
              value={hmac}
              readOnly
              placeholder={t("resultPlaceholder")}
              className="min-h-[80px] font-mono text-sm bg-muted break-all"
              rows={3}
            />
          </div>

          {/* 复制按钮 */}
          <div className="flex justify-center">
            <Button onClick={copy} disabled={!hmac}>
              <Copy className="w-4 h-4 mr-2" />
              {t("copyHMAC")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}