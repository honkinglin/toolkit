"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X } from "lucide-react";

import { getPasswordCrackTimeEstimation } from "@/lib/password-strength-analyzer";

export default function PasswordStrengthAnalyzer() {
  const t = useTranslations("passwordStrengthAnalyzer");

  // 状态管理
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 计算密码强度
  const crackTimeEstimation = useMemo(() => {
    return getPasswordCrackTimeEstimation({ password });
  }, [password]);

  // 详细信息
  const details = useMemo(() => [
    {
      label: t("passwordLength"),
      value: crackTimeEstimation.passwordLength,
    },
    {
      label: t("entropy"),
      value: Math.round(crackTimeEstimation.entropy * 100) / 100,
    },
    {
      label: t("characterSetSize"),
      value: crackTimeEstimation.charsetLength,
    },
    {
      label: t("score"),
      value: `${Math.round(crackTimeEstimation.score)} / 100`,
    },
  ], [crackTimeEstimation, t]);

  // 根据评分获取颜色
  const getScoreColor = (score: number) => {
    if (score < 20) return "text-red-500";
    if (score < 40) return "text-orange-500";
    if (score < 60) return "text-yellow-500";
    if (score < 80) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* 密码输入 */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            className="pr-20 font-mono"
            autoFocus
            data-testid="password-input"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            {password && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPassword("")}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="h-6 w-6 p-0"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 破解时间显示 */}
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-muted-foreground text-sm mb-2">
              {t("crackDuration")}
            </div>
            <div 
              className={`text-2xl font-bold ${getScoreColor(crackTimeEstimation.score)}`}
              data-testid="crack-duration"
            >
              {crackTimeEstimation.crackDurationFormatted}
            </div>
          </CardContent>
        </Card>

        {/* 详细信息 */}
        <Card>
          <CardContent className="py-6">
            <div className="space-y-3">
              {details.map(({ label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="flex-1 text-right text-muted-foreground">
                    {label}
                  </div>
                  <div className="flex-1 text-left font-mono">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 说明文字 */}
        <div className="text-sm text-muted-foreground">
          <span className="font-bold">{t("note")} </span>
          {t("noteText")}
        </div>
      </div>
    </ToolLayout>
  );
}