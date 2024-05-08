"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw } from "lucide-react";

import { NumberInput } from "@/components/ui/number-input";
import { useCopy } from "@/hooks/use-copy";
import {
  generateULIDs,
  formatOptions,
  type ULIDFormat
} from "@/lib/ulid-generator";

export default function ULIDGenerator() {
  const t = useTranslations("ulidGenerator");

  // 状态管理
  const [amount, setAmount] = useState(1);
  const [format, setFormat] = useState<ULIDFormat>("raw");
  const [ulids, setUlids] = useState<string>(""); // 初始为空字符串
  const [isMounted, setIsMounted] = useState(false); // 跟踪是否已挂载

  // 生成 ULID 的函数
  const generateNewULIDs = useCallback(() => {
    if (isMounted) { // 只在客户端生成
      const result = generateULIDs(amount, format);
      setUlids(result);
    }
  }, [amount, format, isMounted]);

  // 组件挂载后生成初始 ULIDs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 当参数变化或组件挂载时重新生成
  useEffect(() => {
    if (isMounted) {
      generateNewULIDs();
    }
  }, [generateNewULIDs, isMounted]);

  // 复制功能
  const { copy } = useCopy({ 
    source: ulids, 
    successMessage: t("ulidsCopied")
  });

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="space-y-6">
          {/* Quantity Input */}
          <div className="flex items-center gap-4">
            <Label className="w-20 text-right">{t("quantity")}</Label>
            <NumberInput
              value={amount}
              onChange={setAmount}
              min={1}
              max={100}
              className="flex-1"
            />
          </div>

          {/* Format Select using Tabs */}
          <div className="flex items-center gap-4">
            <Label className="w-20 text-right">{t("format")}</Label>
            <Tabs value={format} onValueChange={(value) => setFormat(value as ULIDFormat)} className="flex-1">
              <TabsList className="grid w-full grid-cols-2">
                {formatOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Generated ULIDs Display */}
          <div className="bg-muted rounded-lg p-4 min-h-[100px] flex items-center justify-center">
            {isMounted ? (
              <pre className="m-0 font-mono text-sm text-center whitespace-pre-wrap break-all">
                {ulids || "Generating..."}
              </pre>
            ) : (
              <div className="text-muted-foreground text-sm">Loading...</div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <Button onClick={generateNewULIDs} variant="outline" disabled={!isMounted}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("refresh")}
          </Button>
          <Button onClick={copy} disabled={!isMounted || !ulids}>
            <Copy className="w-4 h-4 mr-2" />
            {t("copy")}
          </Button>
        </CardFooter>
      </Card>
    </ToolLayout>
  );
}