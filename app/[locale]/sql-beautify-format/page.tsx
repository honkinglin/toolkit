'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { format as formatSQL, type FormatOptionsWithLanguage } from 'sql-formatter';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useCopy } from '@/hooks/use-copy';
import { Copy } from 'lucide-react';

type SqlDialect =
  | 'bigquery'
  | 'db2'
  | 'hive'
  | 'mariadb'
  | 'mysql'
  | 'n1ql'
  | 'plsql'
  | 'postgresql'
  | 'redshift'
  | 'spark'
  | 'sql'
  | 'sqlite'
  | 'tsql';

type KeywordCase = 'upper' | 'lower' | 'preserve';
type IndentStyle = 'standard' | 'tabularLeft' | 'tabularRight';

const SQL_DIALECTS = [
  { label: 'Standard SQL', value: 'sql' as SqlDialect },
  { label: 'GCP BigQuery', value: 'bigquery' as SqlDialect },
  { label: 'IBM DB2', value: 'db2' as SqlDialect },
  { label: 'Apache Hive', value: 'hive' as SqlDialect },
  { label: 'MariaDB', value: 'mariadb' as SqlDialect },
  { label: 'MySQL', value: 'mysql' as SqlDialect },
  { label: 'Couchbase N1QL', value: 'n1ql' as SqlDialect },
  { label: 'Oracle PL/SQL', value: 'plsql' as SqlDialect },
  { label: 'PostgreSQL', value: 'postgresql' as SqlDialect },
  { label: 'Amazon Redshift', value: 'redshift' as SqlDialect },
  { label: 'Spark', value: 'spark' as SqlDialect },
  { label: 'SQLite', value: 'sqlite' as SqlDialect },
  { label: 'SQL Server Transact-SQL', value: 'tsql' as SqlDialect },
];

const KEYWORD_CASES = [
  { label: 'UPPERCASE', value: 'upper' as KeywordCase },
  { label: 'lowercase', value: 'lower' as KeywordCase },
  { label: 'Preserve', value: 'preserve' as KeywordCase },
];

const INDENT_STYLES = [
  { label: 'Standard', value: 'standard' as IndentStyle },
  { label: 'Tabular left', value: 'tabularLeft' as IndentStyle },
  { label: 'Tabular right', value: 'tabularRight' as IndentStyle },
];

export default function SqlBeautifyFormatPage() {
  const t = useTranslations('sqlBeautifyFormat');

  const [rawSQL, setRawSQL] = useState(
    'select field1,field2,field3 from my_table where my_condition;'
  );
  const [config, setConfig] = useState<FormatOptionsWithLanguage>({
    language: 'sql',
    keywordCase: 'upper',
    indentStyle: 'standard',
    useTabs: false,
  });

  // 格式化SQL
  const formatSQLQuery = (): string => {
    try {
      return formatSQL(rawSQL, config);
    } catch {
      return t('error.invalidSQL') || 'Error formatting SQL';
    }
  };

  const prettifiedSQL = formatSQLQuery();

  const { copy } = useCopy({
    source: prettifiedSQL,
    successMessage: t('copyMessages.success'),
    errorMessage: t('copyMessages.error'),
  });

  const handleCopy = () => {
    copy();
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="w-full max-w-6xl space-y-6">
        {/* 配置选项 */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dialect">{t('config.dialect')}</Label>
                <Select
                  value={config.language}
                  onValueChange={(value: SqlDialect) =>
                    setConfig((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger id="dialect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SQL_DIALECTS.map((dialect) => (
                      <SelectItem key={dialect.value} value={dialect.value}>
                        {dialect.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyword-case">{t('config.keywordCase')}</Label>
                <Select
                  value={config.keywordCase}
                  onValueChange={(value: KeywordCase) =>
                    setConfig((prev) => ({ ...prev, keywordCase: value }))
                  }
                >
                  <SelectTrigger id="keyword-case">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KEYWORD_CASES.map((keywordCase) => (
                      <SelectItem key={keywordCase.value} value={keywordCase.value}>
                        {keywordCase.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="indent-style">{t('config.indentStyle')}</Label>
                <Select
                  value={config.indentStyle}
                  onValueChange={(value: IndentStyle) =>
                    setConfig((prev) => ({ ...prev, indentStyle: value }))
                  }
                >
                  <SelectTrigger id="indent-style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INDENT_STYLES.map((indentStyle) => (
                      <SelectItem key={indentStyle.value} value={indentStyle.value}>
                        {indentStyle.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{t('input.label')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <Textarea
                  value={rawSQL}
                  onChange={(e) => setRawSQL(e.target.value)}
                  placeholder={t('input.placeholder')}
                  className="h-full min-h-[400px] font-mono text-sm resize-none"
                  spellCheck={false}
                />
              </div>
            </CardContent>
          </Card>

          {/* 输出区域 */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t('output.label')}</CardTitle>
              <Button
                onClick={handleCopy}
                disabled={!prettifiedSQL}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {t('copy')}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <Textarea
                  value={prettifiedSQL}
                  readOnly
                  className="h-full min-h-[400px] font-mono text-sm resize-none bg-muted"
                  spellCheck={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
