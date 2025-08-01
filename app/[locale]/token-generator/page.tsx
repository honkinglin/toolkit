"use client";

import { useCallback, useState, useEffect } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";

import { useComputedRefreshable } from "@/hooks/use-computed-refreshable";
import { useCopy } from "@/hooks/use-copy";
import { createToken } from "@/lib/token-generator";

export default function TokenGenerator() {
  const t = useTranslations("tokenGenerator");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 本地状态（不会立即更新 URL）
  const [length, setLength] = useState(() => {
    const param = searchParams.get('length');
    return param ? Number(param) : 64;
  });
  const [withUppercase, setWithUppercase] = useState(() => {
    const param = searchParams.get('uppercase');
    return param ? param === 'true' : true;
  });
  const [withLowercase, setWithLowercase] = useState(() => {
    const param = searchParams.get('lowercase');
    return param ? param === 'true' : true;
  });
  const [withNumbers, setWithNumbers] = useState(() => {
    const param = searchParams.get('numbers');
    return param ? param === 'true' : true;
  });
  const [withSymbols, setWithSymbols] = useState(() => {
    const param = searchParams.get('symbols');
    return param ? param === 'true' : false;
  });

  // 防抖更新 URL
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('length', String(length));
      params.set('uppercase', String(withUppercase));
      params.set('lowercase', String(withLowercase));
      params.set('numbers', String(withNumbers));
      params.set('symbols', String(withSymbols));
      
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500); // 500ms 防抖

    return () => clearTimeout(timeoutId);
  }, [length, withUppercase, withLowercase, withNumbers, withSymbols, searchParams, router, pathname]);

  // 生成 token 的计算函数
  const computeToken = useCallback(() => {
    try {
      return createToken({
        length,
        withUppercase,
        withLowercase,
        withNumbers,
        withSymbols,
      });
    } catch (error) {
      return t('errorMessage');
    }
  }, [length, withUppercase, withLowercase, withNumbers, withSymbols, t]);

  // 可刷新的 token
  const [token, refreshToken] = useComputedRefreshable(computeToken);

  // 复制功能
  const { copy } = useCopy({ 
    source: token, 
    successMessage: t('copySuccess')
  });

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <Card className="w-full">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="flex items-center gap-2">
                {t('uppercase')}
              </Label>
              <Switch 
                id="uppercase" 
                checked={withUppercase}
                onCheckedChange={setWithUppercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="flex items-center gap-2">
                {t('numbers')}
              </Label>
              <Switch 
                id="numbers" 
                checked={withNumbers}
                onCheckedChange={setWithNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="flex items-center gap-2">
                {t('lowercase')}
              </Label>
              <Switch 
                id="lowercase" 
                checked={withLowercase}
                onCheckedChange={setWithLowercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="flex items-center gap-2">
                {t('symbols')}
              </Label>
              <Switch 
                id="symbols" 
                checked={withSymbols}
                onCheckedChange={setWithSymbols}
              />
            </div>
          </div>

          {/* Length Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t('length')} ({length})</Label>
            </div>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              max={512}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Generated Token */}
          <div className="space-y-2">
            <Label>{t('generatedToken')}</Label>
            <Textarea
              value={token}
              readOnly
              className="min-h-[100px] font-mono text-sm text-center"
              placeholder={t('tokenPlaceholder')}
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={copy} variant="outline" className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            {t('copy')}
          </Button>
          <Button onClick={refreshToken} className="flex-1">
            <RefreshCw className="w-4 w-4 mr-2" />
            {t('refresh')}
          </Button>
        </CardFooter>
      </Card>
    </ToolLayout>
  );
}