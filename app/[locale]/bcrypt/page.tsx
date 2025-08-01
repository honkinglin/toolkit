"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { Copy } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";
import { hashPassword, comparePassword } from "@/lib/bcrypt";

export default function Bcrypt() {
  const t = useTranslations("bcrypt");

  // Hash 功能状态
  const [inputString, setInputString] = useState("");
  const [saltCount, setSaltCount] = useState(10);

  // Compare 功能状态
  const [compareString, setCompareString] = useState("");
  const [compareHash, setCompareHash] = useState("");

  // 计算哈希值
  const hashedValue = useMemo(() => {
    if (!inputString) return "";
    return hashPassword({ text: inputString, saltRounds: saltCount });
  }, [inputString, saltCount]);

  // 比较结果
  const compareMatch = useMemo(() => {
    return comparePassword(compareString, compareHash);
  }, [compareString, compareHash]);

  // 复制功能
  const { copy } = useCopy({
    source: hashedValue,
    successMessage: t("hashCopied"),
  });

  return (
    <ToolLayout title={t("title")} description={t("description")}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("hash")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Your string input */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="input-string" className="text-right">
                {t("yourString")}
              </Label>
              <Input
                id="input-string"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder={t("yourStringPlaceholder")}
              />
            </div>

            {/* Salt count */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="salt-count" className="text-right">
                {t("saltCount")}
              </Label>
              <NumberInput
                value={saltCount}
                onChange={setSaltCount}
                min={1}
                max={15}
                className="w-fit"
              />
            </div>

            {/* Generated hash */}
            <Textarea
              value={hashedValue}
              readOnly
              className="min-h-[80px] font-mono text-sm text-center"
              placeholder="Generated hash will appear here..."
            />

            {/* Copy button */}
            <div className="flex justify-center">
              <Button onClick={copy} disabled={!hashedValue}>
                <Copy className="w-4 h-4 mr-2" />
                {t("copyHash")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compare Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("compareStringWithHash")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Compare string input */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="compare-string" className="text-right">
                {t("yourString")}
              </Label>
              <Input
                id="compare-string"
                value={compareString}
                onChange={(e) => setCompareString(e.target.value)}
                placeholder={t("yourStringToCompare")}
              />
            </div>

            {/* Compare hash input */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="compare-hash" className="text-right">
                {t("yourHash")}
              </Label>
              <Input
                id="compare-hash"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                placeholder={t("yourHashToCompare")}
              />
            </div>

            {/* Match result */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label className="text-right">
                {t("doTheyMatch")}
              </Label>
              <div className="flex items-center">
                <span
                  className={`font-semibold ${
                    compareMatch
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {compareMatch ? t("yes") : t("no")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
    </ToolLayout>
  );
}