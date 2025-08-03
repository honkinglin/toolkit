'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ToolLayout } from '@/components/layout/tool-layout';
import { decodeJwt } from '@/lib/jwt-utils';

const TEST_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JWTParserPage() {
  const t = useTranslations('jwtParser');

  const [rawJwt, setRawJwt] = useState(TEST_JWT);

  const decodedResult = useMemo(() => {
    if (!rawJwt.trim()) {
      return { data: null, error: null };
    }

    const parts = rawJwt.split('.');
    if (parts.length !== 3) {
      return { data: null, error: 'Invalid JWT format' };
    }

    const data = decodeJwt(rawJwt);
    if (!data) {
      return { data: null, error: 'Invalid JWT token' };
    }

    return { data, error: null };
  }, [rawJwt]);

  const sections = [
    { key: 'header' as const, title: 'Header' },
    { key: 'payload' as const, title: 'Payload' },
  ];

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">JWT to decode</Label>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Put your token here..."
            value={rawJwt}
            onChange={(e) => setRawJwt(e.target.value)}
            rows={5}
            className="font-mono text-sm"
          />
          {decodedResult.error && (
            <p className="text-sm text-destructive mt-2">{decodedResult.error}</p>
          )}
        </CardContent>
      </Card>

      {decodedResult.data && (
        <Card className="w-full">
          <CardContent>
            <Table>
              <TableBody>
                {sections.map((section) => (
                  <React.Fragment key={section.key}>
                    <TableRow>
                      <TableCell colSpan={2} className="bg-muted/50 font-semibold text-center py-3">
                        {section.title}
                      </TableCell>
                    </TableRow>
                    {decodedResult.data![section.key].map((claim) => (
                      <TableRow key={`${section.key}-${claim.claim}`}>
                        <TableCell className="font-medium align-top w-1/3">
                          <div className="space-y-1">
                            <span className="font-bold">{claim.claim}</span>
                            {claim.claimDescription && (
                              <div className="text-xs text-muted-foreground">
                                ({claim.claimDescription})
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="space-y-1">
                            <pre className="whitespace-pre-wrap break-all font-mono text-sm">
                              {claim.value}
                            </pre>
                            {claim.friendlyValue && (
                              <div className="text-sm text-muted-foreground">
                                ({claim.friendlyValue})
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </ToolLayout>
  );
}
