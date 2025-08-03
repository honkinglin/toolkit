'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useCopy } from '@/hooks/use-copy';
import { Copy } from 'lucide-react';

// Types
type Scope = 'read' | 'write' | 'execute';
type Group = 'owner' | 'group' | 'public';

type GroupPermissions = {
  [k in Scope]: boolean;
};

type Permissions = {
  [k in Group]: GroupPermissions;
};

// Utility functions
function computeChmodOctalRepresentation(permissions: Permissions): string {
  const permissionValue = { read: 4, write: 2, execute: 1 };

  const getGroupPermissionValue = (permission: GroupPermissions) =>
    Object.entries(permission).reduce(
      (acc, [key, isPermSet]) => acc + (isPermSet ? permissionValue[key as Scope] || 0 : 0),
      0
    );

  return [
    getGroupPermissionValue(permissions.owner),
    getGroupPermissionValue(permissions.group),
    getGroupPermissionValue(permissions.public),
  ].join('');
}

function computeChmodSymbolicRepresentation(permissions: Permissions): string {
  const permissionValue = { read: 'r', write: 'w', execute: 'x' };

  const getGroupPermissionValue = (permission: GroupPermissions) =>
    Object.entries(permission).reduce(
      (acc, [key, isPermSet]) => acc + (isPermSet ? permissionValue[key as Scope] || '' : '-'),
      ''
    );

  return [
    getGroupPermissionValue(permissions.owner),
    getGroupPermissionValue(permissions.group),
    getGroupPermissionValue(permissions.public),
  ].join('');
}

export default function ChmodCalculatorPage() {
  const t = useTranslations('chmodCalculator');

  const [permissions, setPermissions] = useState<Permissions>({
    owner: { read: false, write: false, execute: false },
    group: { read: false, write: false, execute: false },
    public: { read: false, write: false, execute: false },
  });

  const scopes: { scope: Scope; title: string }[] = [
    { scope: 'read', title: t('permissions.read') },
    { scope: 'write', title: t('permissions.write') },
    { scope: 'execute', title: t('permissions.execute') },
  ];

  const groups: Group[] = ['owner', 'group', 'public'];

  const octal = computeChmodOctalRepresentation(permissions);
  const symbolic = computeChmodSymbolicRepresentation(permissions);
  const chmodCommand = `chmod ${octal} path`;

  const { copy } = useCopy({
    source: chmodCommand,
    successMessage: t('copyMessages.success'),
    errorMessage: t('copyMessages.error'),
  });

  const handlePermissionChange = (group: Group, scope: Scope, checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [scope]: checked,
      },
    }));
  };

  const handleCopy = () => {
    copy();
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="w-full max-w-4xl space-y-6">
        {/* 权限表格 */}
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-32"></TableHead>
                  <TableHead className="text-center">{t('groups.owner')}</TableHead>
                  <TableHead className="text-center">{t('groups.group')}</TableHead>
                  <TableHead className="text-center">{t('groups.public')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scopes.map(({ scope, title }) => (
                  <TableRow key={scope}>
                    <TableCell className="font-medium text-right">{title}</TableCell>
                    {groups.map((group) => (
                      <TableCell key={group} className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={permissions[group][scope]}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(group, scope, checked as boolean)
                            }
                          />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 结果显示 */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-primary mb-2">{octal}</div>
            <div className="text-2xl font-mono text-muted-foreground border-b-2 border-primary inline-block pb-1">
              {symbolic}
            </div>
          </div>
        </div>

        {/* Chmod命令 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              {t('command.title')}
              <Button onClick={handleCopy} size="sm" variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                {t('copy')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input value={chmodCommand} readOnly className="font-mono" />
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
