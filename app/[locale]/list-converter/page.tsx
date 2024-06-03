'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { convert } from '@/lib/list-converter';
import type { ConvertOptions, SortOrder, SortOption } from '@/lib/list-converter.types';

const sortOrderOptions: SortOption[] = [
  {
    label: 'Sort ascending',
    value: 'asc',
    disabled: false,
  },
  {
    label: 'Sort descending',
    value: 'desc',
    disabled: false,
  },
];

const defaultConfig: ConvertOptions = {
  lowerCase: false,
  trimItems: true,
  removeDuplicates: true,
  keepLineBreaks: false,
  itemPrefix: '',
  itemSuffix: '',
  listPrefix: '',
  listSuffix: '',
  reverseList: false,
  sortList: null,
  separator: ', ',
};

export default function ListConverterPage() {
  const t = useTranslations('sidebar');
  const lc = useTranslations('listConverter');

  const [inputData, setInputData] = useState('');
  const [config, setConfig] = useState<ConvertOptions>(defaultConfig);
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('list-converter:conversionConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch {
        // If parsing fails, use default config
      }
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('list-converter:conversionConfig', JSON.stringify(config));
  }, [config]);

  // Convert input data using the current config
  const transformedData = useMemo(() => {
    return convert(inputData, config);
  }, [inputData, config]);

  const updateConfig = (updates: Partial<ConvertOptions>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleCopy = async () => {
    if (!transformedData) return;

    try {
      await navigator.clipboard.writeText(transformedData);

      setCopied(true);
      setTooltipOpen(true);

      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);

      console.log('Transformed data copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTooltipOpenChange = (open: boolean) => {
    setTooltipOpen(open);
    if (!open) {
      setCopied(false);
    }
  };

  return (
    <ToolLayout title={t('listConverter')} description={lc('description')}>
      {/* Configuration Card */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Switches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{lc('trimItems')}</Label>
                <Switch
                  checked={config.trimItems}
                  onCheckedChange={(checked) => updateConfig({ trimItems: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{lc('removeDuplicates')}</Label>
                <Switch
                  checked={config.removeDuplicates}
                  onCheckedChange={(checked) => updateConfig({ removeDuplicates: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{lc('convertToLowercase')}</Label>
                <Switch
                  checked={config.lowerCase}
                  onCheckedChange={(checked) => updateConfig({ lowerCase: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{lc('keepLineBreaks')}</Label>
                <Switch
                  checked={config.keepLineBreaks}
                  onCheckedChange={(checked) => updateConfig({ keepLineBreaks: checked })}
                />
              </div>
            </div>

            {/* Right Column - Inputs and Selects */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{lc('sortList')}</Label>
                <Select
                  value={config.sortList || 'none'}
                  onValueChange={(value) =>
                    updateConfig({ sortList: value === 'none' ? null : (value as SortOrder) })
                  }
                  disabled={config.reverseList}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={lc('sortPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{lc('noSort')}</SelectItem>
                    {sortOrderOptions.map((option) => (
                      <SelectItem key={option.value!} value={option.value!}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{lc('separator')}</Label>
                <Input
                  value={config.separator}
                  onChange={(e) => updateConfig({ separator: e.target.value })}
                  placeholder=","
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{lc('wrapItem')}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={config.itemPrefix}
                    onChange={(e) => updateConfig({ itemPrefix: e.target.value })}
                    placeholder={lc('itemPrefix')}
                  />
                  <Input
                    value={config.itemSuffix}
                    onChange={(e) => updateConfig({ itemSuffix: e.target.value })}
                    placeholder={lc('itemSuffix')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{lc('wrapList')}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={config.listPrefix}
                    onChange={(e) => updateConfig({ listPrefix: e.target.value })}
                    placeholder={lc('listPrefix')}
                  />
                  <Input
                    value={config.listSuffix}
                    onChange={(e) => updateConfig({ listSuffix: e.target.value })}
                    placeholder={lc('listSuffix')}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Card */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{lc('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder={lc('inputPlaceholder')}
            className="font-mono min-h-[200px] max-h-[380px] resize-y"
            autoFocus
          />
        </CardContent>
      </Card>

      {/* Output Card */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{lc('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            value={transformedData}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={lc('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopy} disabled={!transformedData} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {lc('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy transformed data to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
