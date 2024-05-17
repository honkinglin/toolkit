"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { 
  encryptText, 
  decryptText, 
  algorithmOptions,
  type AlgorithmType 
} from "@/lib/crypto-utils";

export default function EncryptDecryptText() {
  const t = useTranslations("encryptDecryptText");

  // 加密相关状态
  const [encryptInput, setEncryptInput] = useState("Lorem ipsum dolor sit amet");
  const [encryptSecret, setEncryptSecret] = useState("my secret key");
  const [encryptAlgorithm, setEncryptAlgorithm] = useState<AlgorithmType>("AES");

  // 解密相关状态
  const [decryptInput, setDecryptInput] = useState("U2FsdGVkX1/EC3+6P5dbbkZ3e1kQ5o2yzuU0NHTjmrKnLBEwreV489Kr0DIB+uBs");
  const [decryptSecret, setDecryptSecret] = useState("my secret key");
  const [decryptAlgorithm, setDecryptAlgorithm] = useState<AlgorithmType>("AES");

  // 加密输出
  const encryptedOutput = useMemo(() => {
    try {
      if (!encryptInput || !encryptSecret) return "";
      return encryptText(encryptInput, encryptSecret, encryptAlgorithm);
    } catch {
      return "";
    }
  }, [encryptInput, encryptSecret, encryptAlgorithm]);

  // 解密输出和错误处理
  const { decryptedOutput, decryptError } = useMemo(() => {
    try {
      if (!decryptInput || !decryptSecret) {
        return { decryptedOutput: "", decryptError: null };
      }
      const result = decryptText(decryptInput, decryptSecret, decryptAlgorithm);
      return { decryptedOutput: result, decryptError: null };
    } catch (error) {
      return { 
        decryptedOutput: "", 
        decryptError: error instanceof Error ? error.message : t("unableToDecrypt")
      };
    }
  }, [decryptInput, decryptSecret, decryptAlgorithm, t]);

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* 加密卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>{t("encrypt")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 输入区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 文本输入 */}
              <div className="space-y-2">
                <Label htmlFor="encrypt-text">{t("yourText")}</Label>
                <Textarea
                  id="encrypt-text"
                  value={encryptInput}
                  onChange={(e) => setEncryptInput(e.target.value)}
                  placeholder={t("textPlaceholder")}
                  className="min-h-[120px] font-mono text-sm"
                  rows={4}
                />
              </div>

              {/* 密钥和算法 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="encrypt-secret">{t("yourSecretKey")}</Label>
                  <div className="relative">
                    <Input
                      id="encrypt-secret"
                      value={encryptSecret}
                      onChange={(e) => setEncryptSecret(e.target.value)}
                      placeholder={t("secretKeyPlaceholder")}
                      className="font-mono pr-10"
                    />
                    {encryptSecret && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setEncryptSecret("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* 加密算法选择 */}
                <div className="space-y-2">
                  <Label>{t("encryptionAlgorithm")}</Label>
                  <Select value={encryptAlgorithm} onValueChange={(value) => setEncryptAlgorithm(value as AlgorithmType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select algorithm" />
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
              </div>
            </div>

            {/* 加密输出 */}
            <div className="space-y-2">
              <Label htmlFor="encrypt-output">{t("yourTextEncrypted")}</Label>
              <Textarea
                id="encrypt-output"
                value={encryptedOutput}
                readOnly
                placeholder={t("hashPlaceholder")}
                className="min-h-[80px] font-mono text-sm bg-muted"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* 解密卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>{t("decrypt")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 输入区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 加密文本输入 */}
              <div className="space-y-2">
                <Label htmlFor="decrypt-text">{t("yourEncryptedText")}</Label>
                <Textarea
                  id="decrypt-text"
                  value={decryptInput}
                  onChange={(e) => setDecryptInput(e.target.value)}
                  placeholder={t("encryptedTextPlaceholder")}
                  className="min-h-[120px] font-mono text-sm"
                  rows={4}
                />
              </div>

              {/* 密钥和算法 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="decrypt-secret">{t("yourSecretKey")}</Label>
                  <div className="relative">
                    <Input
                      id="decrypt-secret"
                      value={decryptSecret}
                      onChange={(e) => setDecryptSecret(e.target.value)}
                      placeholder={t("secretKeyPlaceholder")}
                      className="font-mono pr-10"
                    />
                    {decryptSecret && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setDecryptSecret("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* 解密算法选择 */}
                <div className="space-y-2">
                  <Label>{t("encryptionAlgorithm")}</Label>
                  <Select value={decryptAlgorithm} onValueChange={(value) => setDecryptAlgorithm(value as AlgorithmType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select algorithm" />
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
              </div>
            </div>

            {/* 错误提示或解密输出 */}
            {decryptError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("errorWhileDecrypting")}</AlertTitle>
                <AlertDescription>{decryptError}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="decrypt-output">{t("yourDecryptedText")}</Label>
                <Textarea
                  id="decrypt-output"
                  value={decryptedOutput}
                  readOnly
                  placeholder={t("hashPlaceholder")}
                  className="min-h-[80px] font-mono text-sm bg-muted"
                  rows={3}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}