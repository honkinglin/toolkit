'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCopy } from '@/hooks/use-copy';
import {
  generateEntropy,
  generateMnemonic,
  validateMnemonic,
  mnemonicToEntropy,
  SUPPORTED_LANGUAGES,
  type Language,
} from '@/lib/bip39-utils';

export default function BIP39PassphraseGenerator() {
  const t = useTranslations('bip39Generator');

  // 状态管理
  const [language, setLanguage] = useState<Language>('english');
  const [entropy, setEntropy] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // 生成新的熵和助记词
  const generateNew = useCallback(() => {
    const newEntropy = generateEntropy();
    const newMnemonic = generateMnemonic(newEntropy, language);
    setEntropy(newEntropy);
    setMnemonic(newMnemonic);
  }, [language]);

  // 从熵生成助记词
  const generateMnemonicFromEntropy = useCallback(
    (entropyValue: string) => {
      if (!entropyValue) {
        setMnemonic('');
        return;
      }

      // 验证熵值格式（必须是有效的十六进制）
      if (!/^[0-9a-fA-F]+$/.test(entropyValue) || entropyValue.length % 2 !== 0) {
        setMnemonic('');
        return;
      }

      const newMnemonic = generateMnemonic(entropyValue, language);
      setMnemonic(newMnemonic);
    },
    [language]
  );

  // 从助记词生成熵
  const generateEntropyFromMnemonic = useCallback(
    (mnemonicValue: string) => {
      if (!mnemonicValue.trim()) {
        setEntropy('');
        return;
      }

      if (!validateMnemonic(mnemonicValue, language)) {
        setEntropy('');
        return;
      }

      const newEntropy = mnemonicToEntropy(mnemonicValue, language);
      setEntropy(newEntropy);
    },
    [language]
  );

  // 处理熵值变化
  const handleEntropyChange = useCallback(
    (value: string) => {
      setEntropy(value);
      generateMnemonicFromEntropy(value);
    },
    [generateMnemonicFromEntropy]
  );

  // 处理助记词变化
  const handleMnemonicChange = useCallback(
    (value: string) => {
      setMnemonic(value);
      generateEntropyFromMnemonic(value);
    },
    [generateEntropyFromMnemonic]
  );

  // 处理语言变化
  const handleLanguageChange = useCallback(
    (newLanguage: Language) => {
      setLanguage(newLanguage);

      // 如果当前有熵值，重新生成助记词
      if (entropy) {
        const newMnemonic = generateMnemonic(entropy, newLanguage);
        setMnemonic(newMnemonic);
      }
    },
    [entropy]
  );

  // 组件挂载时生成初始值
  useEffect(() => {
    setIsMounted(true);
    generateNew();
  }, [generateNew]);

  // 复制功能
  const { copy: copyEntropy } = useCopy({
    source: entropy,
    successMessage: t('entropyCopied'),
  });

  const { copy: copyMnemonic } = useCopy({
    source: mnemonic,
    successMessage: t('passphraseCopied'),
  });

  // 验证状态
  const isEntropyValid = entropy
    ? /^[0-9a-fA-F]+$/.test(entropy) && entropy.length % 2 === 0
    : true;
  const isMnemonicValid = mnemonic ? validateMnemonic(mnemonic, language) : true;

  if (!isMounted) {
    return (
      <ToolLayout title={t('title')} description={t('description')}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="space-y-6">
          {/* 语言选择 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>{t('language')}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateNew} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('generateNew')}
              </Button>
            </div>
          </div>

          {/* 熵值输入 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="entropy-input">{t('entropy')}</Label>
              <Button variant="outline" size="sm" onClick={copyEntropy} disabled={!entropy}>
                <Copy className="w-4 h-4 mr-2" />
                {t('copy')}
              </Button>
            </div>
            <Input
              id="entropy-input"
              value={entropy}
              onChange={(e) => handleEntropyChange(e.target.value)}
              placeholder={t('entropyPlaceholder')}
              className={`font-mono ${!isEntropyValid ? 'border-red-500' : ''}`}
            />
            {!isEntropyValid && <p className="text-sm text-red-500">{t('invalidEntropy')}</p>}
          </div>

          {/* 助记词输出 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="mnemonic-output">{t('passphrase')}</Label>
              <Button variant="outline" size="sm" onClick={copyMnemonic} disabled={!mnemonic}>
                <Copy className="w-4 h-4 mr-2" />
                {t('copy')}
              </Button>
            </div>
            <Textarea
              id="mnemonic-output"
              value={mnemonic}
              onChange={(e) => handleMnemonicChange(e.target.value)}
              placeholder={t('passphrasePlaceholder')}
              className={`min-h-[80px] font-mono ${!isMnemonicValid ? 'border-red-500' : ''}`}
              rows={3}
            />
            {!isMnemonicValid && <p className="text-sm text-red-500">{t('invalidMnemonic')}</p>}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
