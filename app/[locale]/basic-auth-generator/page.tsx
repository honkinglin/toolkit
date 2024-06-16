'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopyWithTooltip } from '@/hooks/use-copy';

// Base64 encoding function
function textToBase64(text: string): string {
  try {
    return btoa(text);
  } catch {
    return '';
  }
}

export default function BasicAuthGeneratorPage() {
  const bag = useTranslations('basicAuthGenerator');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Generate the authorization header
  const header = useMemo(() => {
    if (!username.trim() && !password.trim()) return '';
    const credentials = `${username}:${password}`;
    const encoded = textToBase64(credentials);
    return `Authorization: Basic ${encoded}`;
  }, [username, password]);

  // Use the custom copy hook
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  const handleCopyHeader = () => {
    handleCopy(header);
  };

  return (
    <ToolLayout title={bag('title')} description={bag('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{bag('cardTitle')}</Label>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username">{bag('usernameLabel')}</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={bag('usernamePlaceholder')}
              className="font-mono"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">{bag('passwordLabel')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={bag('passwordPlaceholder')}
                className="font-mono pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Authorization Header Output */}
          <div className="space-y-2">
            <Label>{bag('authorizationHeader')}</Label>
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="font-mono text-sm break-all whitespace-pre-wrap">
                  {header || bag('headerPlaceholder')}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Copy Button */}
          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyHeader} disabled={!header} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {bag('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? bag('copySuccessTooltip') : bag('copyTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
