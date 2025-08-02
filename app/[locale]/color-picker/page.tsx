'use client';

import { useTranslations } from 'next-intl';
import { HexColorPicker } from 'react-colorful';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, X } from 'lucide-react';
import { useColorPicker } from '@/hooks/use-color-picker';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useState } from 'react';

export default function ColorPickerPage() {
  const t = useTranslations('sidebar');
  const cp = useTranslations('colorPicker');

  const { colorValues, handleInputChange, handleColorPickerChange, getValidation, formats } =
    useColorPicker();

  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);

      // Set copied state for this specific key
      setCopiedStates((prev) => ({ ...prev, [key]: true }));

      // Keep tooltip open and show "Copied!" message
      setTooltipOpen((prev) => ({ ...prev, [key]: true }));

      console.log('Copied to clipboard:', value);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTooltipOpenChange = (key: string, open: boolean) => {
    setTooltipOpen((prev) => ({ ...prev, [key]: open }));

    // If tooltip is being closed, also reset copied state
    if (!open) {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleClear = (key: keyof typeof formats) => {
    handleInputChange(key, '');
  };

  // Color picker style
  const colorPickerStyle = {
    width: '100%',
    height: '150px',
  };

  return (
    <ToolLayout title={t('colorPicker')} description={cp('description')}>
      <TooltipProvider>
        <Card className="w-full">
          <CardContent className="space-y-6 pt-6">
            {/* Color Picker */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium min-w-[100px] text-right">
                  {cp('colorPicker')}
                </Label>
                <div className="flex-1 ml-4">
                  <HexColorPicker
                    color={colorValues.picker}
                    onChange={handleColorPickerChange}
                    style={colorPickerStyle}
                  />
                </div>
              </div>
            </div>

            {/* Text Format Inputs */}
            {Object.entries(formats).map(([key, format]) => {
              if (format.type === 'color-picker') return null;

              const validation = getValidation(key as keyof typeof formats);
              const isCopied = copiedStates[key] || false;
              const isTooltipOpen = tooltipOpen[key] ?? false; // 确保始终是boolean值

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium min-w-[100px] text-right">
                      {cp(key as string)}
                    </Label>
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={colorValues[key as keyof typeof colorValues]}
                        onChange={(e) =>
                          handleInputChange(key as keyof typeof formats, e.target.value)
                        }
                        placeholder={format.placeholder}
                        className={`font-mono ${validation.error ? 'border-red-500' : ''}`}
                      />
                      <Tooltip
                        open={isTooltipOpen}
                        onOpenChange={(open) => handleTooltipOpenChange(key, open)}
                      >
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleCopy(colorValues[key as keyof typeof colorValues], key)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isCopied ? 'Copied!' : 'Copy to clipboard'}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleClear(key as keyof typeof formats)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clear</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  {validation.error && (
                    <p className="text-sm text-red-500 ml-[116px]">{validation.error}</p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </TooltipProvider>
    </ToolLayout>
  );
}
