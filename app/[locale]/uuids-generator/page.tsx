"use client";

import { useState, useMemo, useCallback } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";

import { ButtonSelect } from "@/components/ui/button-select";
import { NumberInput } from "@/components/ui/number-input";
import { useComputedRefreshable } from "@/hooks/use-computed-refreshable";
import { useCopy } from "@/hooks/use-copy";
import { 
  generateUUIDs, 
  isValidUUID,
  versions, 
  namespaceOptions,
  type UUIDVersion,
  type V35Args,
  type NamespaceKey
} from "@/lib/uuid-generator";

export default function UUIDsGenerator() {
  const t = useTranslations("uuidsGenerator");

  // 状态管理
  const [version, setVersion] = useState<UUIDVersion>("v4");
  const [count, setCount] = useState(1);
  const [v35Args, setV35Args] = useState<V35Args>({
    namespace: namespaceOptions.URL,
    name: ""
  });

  // 生成 UUID 的计算函数
  const computeUUIDs = useCallback(() => {
    const uuids = generateUUIDs(version, count, v35Args);
    return uuids.join('\n');
  }, [version, count, v35Args]);

  // 可刷新的 UUIDs
  const [uuids, refreshUUIDs] = useComputedRefreshable(computeUUIDs);

  // 复制功能
  const { copy } = useCopy({ 
    source: uuids, 
    successMessage: t("uuidsCopied")
  });

  // 处理预设命名空间选择
  const handlePresetNamespaceChange = useCallback((namespaceKey: string) => {
    if (namespaceKey in namespaceOptions) {
      const namespaceValue = namespaceOptions[namespaceKey as NamespaceKey];
      setV35Args(prev => ({ ...prev, namespace: namespaceValue }));
    }
  }, []);

  // 处理自定义命名空间输入
  const handleCustomNamespaceChange = useCallback((namespace: string) => {
    setV35Args(prev => ({ ...prev, namespace }));
  }, []);

  // 处理名称变化
  const handleNameChange = useCallback((name: string) => {
    setV35Args(prev => ({ ...prev, name }));
  }, []);

  // 检查命名空间是否有效
  const isNamespaceValid = useMemo(() => {
    return isValidUUID(v35Args.namespace);
  }, [v35Args.namespace]);

  // 获取当前选中的预设命名空间键
  const currentNamespaceKey = useMemo(() => {
    const entry = Object.entries(namespaceOptions).find(([, value]) => value === v35Args.namespace);
    return entry ? entry[0] : '';
  }, [v35Args.namespace]);

  // 检查是否需要显示 v3/v5 参数
  const showV35Args = version === 'v3' || version === 'v5';

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <Card className="w-full">
        <CardContent className="space-y-6">
          {/* UUID Version Select */}
          <div className="space-y-2">
            <Label>{t("uuidVersion")}</Label>
            <ButtonSelect
              value={version}
              onChange={setVersion}
              options={versions}
            />
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <Label>{t("quantity")}</Label>
            <NumberInput
              value={count}
              onChange={setCount}
              min={1}
              max={50}
              className="w-fit"
            />
          </div>

          {/* V3/V5 Arguments */}
          {showV35Args && (
            <div className="space-y-4">
              {/* Namespace Preset Buttons */}
              <div className="space-y-2">
                <Label>{t("namespace")}</Label>
                <ButtonSelect
                  value={currentNamespaceKey}
                  onChange={handlePresetNamespaceChange}
                  options={Object.keys(namespaceOptions)}
                />
              </div>

              {/* Custom Namespace Input */}
              <div className="space-y-2">
                <Input
                  value={v35Args.namespace}
                  onChange={(e) => handleCustomNamespaceChange(e.target.value)}
                  placeholder={t("namespacePlaceholder")}
                  className={`font-mono ${!isNamespaceValid ? 'border-red-500' : ''}`}
                />
                {!isNamespaceValid && (
                  <p className="text-sm text-red-500">{t("invalidUuid")}</p>
                )}
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name-input">{t("name")}</Label>
                <Input
                  id="name-input"
                  value={v35Args.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder={t("namePlaceholder")}
                />
              </div>
            </div>
          )}

          {/* Generated UUIDs */}
          <div className="space-y-2">
            <Label>{t("uuidPlaceholder")}</Label>
            <Textarea
              value={uuids}
              readOnly
              className="min-h-[100px] font-mono text-sm text-center"
              placeholder={t("uuidPlaceholder")}
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={copy} variant="outline" className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            {t("copy")}
          </Button>
          <Button onClick={refreshUUIDs} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("refresh")}
          </Button>
        </CardFooter>
      </Card>
    </ToolLayout>
  );
}