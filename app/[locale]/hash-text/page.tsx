"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { InputCopyable } from "@/components/ui/input-copyable";

import { 
  algoNames, 
  encodingOptions, 
  hashText,
  type Encoding,
  type AlgoNames 
} from "@/lib/hash-text";

export default function HashText() {
  const t = useTranslations("hashText");
  
  const [clearText, setClearText] = useState("");
  const [encoding, setEncoding] = useState<Encoding>("Hex");

  // 计算所有算法的哈希值
  const hashResults = useMemo(() => {
    return algoNames.reduce((acc, algo) => {
      acc[algo] = hashText(algo, clearText, encoding);
      return acc;
    }, {} as Record<AlgoNames, string>);
  }, [clearText, encoding]);

  return (
    <ToolLayout title={t("title")} description={t("description")}>
      <Card className="w-full">
        <CardContent className="space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <Label htmlFor="text-input">
              {t("yourTextToHash")}
            </Label>
            <Textarea
              id="text-input"
              value={clearText}
              onChange={(e) => setClearText(e.target.value)}
              placeholder={t("placeholder")}
              className="min-h-[100px] font-mono"
              autoFocus
            />
          </div>

          <Separator />

          {/* Encoding Select */}
          <div className="space-y-2">
            <Label htmlFor="encoding-select">
              {t("digestEncoding")}
            </Label>
            <Select
              value={encoding}
              onValueChange={(value: Encoding) => setEncoding(value)}
            >
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue />
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

          {/* Hash Results */}
          <div className="space-y-2">
            {algoNames.map((algo) => (
              <div key={algo} className="flex items-center gap-0">
                <div className="flex-shrink-0 w-24 h-10 bg-muted border border-r-0 rounded-l-md flex items-center justify-center text-sm font-medium">
                  {algo}
                </div>
                <div className="flex-1">
                  <InputCopyable
                    value={hashResults[algo]}
                    copyMessage={t("hashCopied")}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}