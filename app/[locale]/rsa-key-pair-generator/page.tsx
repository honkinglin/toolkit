"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { NumberInput } from "@/components/ui/number-input";
import { useCopy } from "@/hooks/use-copy";
import { generateKeyPair, validateBits, type RSAKeyPair } from "@/lib/rsa-key-pair-generator";

export default function RSAKeyPairGenerator() {
  const t = useTranslations("rsaKeyPairGenerator");

  // 状态管理
  const [bits, setBits] = useState(2048);
  const [keyPair, setKeyPair] = useState<RSAKeyPair>({
    publicKeyPem: '',
    privateKeyPem: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 验证位数
  const bitsError = validateBits(bits);

  // 复制功能
  const { copy: copyPublicKey } = useCopy({ 
    source: keyPair.publicKeyPem, 
    successMessage: t("publicKeyCopied")
  });

  const { copy: copyPrivateKey } = useCopy({ 
    source: keyPair.privateKeyPem, 
    successMessage: t("privateKeyCopied")
  });

  // 生成密钥对
  const generateKeys = useCallback(async () => {
    if (bitsError) return;

    setIsGenerating(true);
    setError(null);

    try {
      const newKeyPair = await generateKeyPair({ bits });
      setKeyPair(newKeyPair);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("generationError"));
      setKeyPair({ publicKeyPem: '', privateKeyPem: '' });
    } finally {
      setIsGenerating(false);
    }
  }, [bits, bitsError, t]);

  // 初始生成
  useEffect(() => {
    generateKeys();
  }, [generateKeys]);

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="space-y-6">
          {/* 控制面板 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 max-w-lg mx-auto">
            {/* 位数输入 */}
            <div className="space-y-2 flex-1">
              <Label>{t("bits")}</Label>
              <NumberInput
                value={bits}
                onChange={setBits}
                min={256}
                max={16384}
                step={8}
                disabled={isGenerating}
              />
              {bitsError && (
                <p className="text-sm text-red-500">{t("bitsValidation")}</p>
              )}
            </div>

            {/* 刷新按钮 */}
            <Button 
              onClick={generateKeys}
              disabled={isGenerating || !!bitsError}
              className="w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? t("generating") : t("refreshKeyPair")}
            </Button>
          </div>

          {/* 错误提示 */}
          {error && (
            <Alert variant="destructive" className="max-w-lg mx-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 公钥 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t("publicKey")}</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyPublicKey}
                disabled={!keyPair.publicKeyPem}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={keyPair.publicKeyPem}
              readOnly
              placeholder="-----BEGIN PUBLIC KEY-----&#10;Public key will appear here...&#10;-----END PUBLIC KEY-----"
              className="font-mono text-sm resize-none min-h-[200px]"
              rows={8}
            />
          </div>

          {/* 私钥 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t("privateKey")}</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyPrivateKey}
                disabled={!keyPair.privateKeyPem}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={keyPair.privateKeyPem}
              readOnly
              placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;Private key will appear here...&#10;-----END RSA PRIVATE KEY-----"
              className="font-mono text-sm resize-none min-h-[300px]"
              rows={12}
            />
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}