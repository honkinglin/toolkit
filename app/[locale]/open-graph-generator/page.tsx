'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopyWithTooltip } from '@/hooks/use-copy';

// Types
interface OGSchemaTypeElementBase {
  key: string;
  label: string;
  placeholder: string;
}

interface OGSchemaTypeElementInput extends OGSchemaTypeElementBase {
  type: 'input';
}

interface OGSchemaTypeElementSelect extends OGSchemaTypeElementBase {
  type: 'select';
  options: Array<{ label: string; value: string }>;
}

type OGSchemaTypeElement = OGSchemaTypeElementInput | OGSchemaTypeElementSelect;

interface OGSchemaType {
  name: string;
  elements: OGSchemaTypeElement[];
}

// Schema definitions
const typeOptions = [
  { label: 'Website', value: 'website' },
  { label: 'Article', value: 'article' },
  { label: 'Book', value: 'book' },
  { label: 'Profile', value: 'profile' },
];

const twitterCardOptions = [
  { label: 'Summary', value: 'summary' },
  { label: 'Summary with large image', value: 'summary_large_image' },
  { label: 'Application', value: 'app' },
  { label: 'Player', value: 'player' },
];

// Generate meta tags function
function generateMetaTags(metadata: Record<string, string>): string {
  const tags: string[] = [];

  // Add comment for og meta
  tags.push('<!-- og meta -->');

  // Basic OG tags
  Object.entries(metadata).forEach(([key, value]) => {
    if (value && typeof value === 'string' && !key.startsWith('twitter:')) {
      if (key === 'type') {
        tags.push(`<meta property="og:type" value="${value}" />`);
      } else {
        tags.push(`<meta property="og:${key}" value="${value}" />`);
      }
    }
  });

  // Add comment for twitter meta
  tags.push('');
  tags.push('<!-- twitter meta -->');

  // Twitter tags
  Object.entries(metadata).forEach(([key, value]) => {
    if (value && typeof value === 'string' && key.startsWith('twitter:')) {
      tags.push(`<meta name="${key}" value="${value}" />`);
    }
  });

  return tags.join('\n');
}

export default function OpenGraphGeneratorPage() {
  const ogg = useTranslations('openGraphGenerator');

  const [metadata, setMetadata] = useState<Record<string, string>>({
    type: 'website',
    'twitter:card': 'summary_large_image',
  });

  // Update metadata
  const updateMetadata = (key: string, value: string) => {
    setMetadata((prev) => ({ ...prev, [key]: value }));
  };

  // Schema sections
  const sections: OGSchemaType[] = useMemo(
    () => [
      {
        name: ogg('sections.general'),
        elements: [
          {
            type: 'select',
            label: ogg('general.pageType'),
            placeholder: ogg('general.pageTypePlaceholder'),
            key: 'type',
            options: typeOptions,
          },
          {
            type: 'input',
            label: ogg('general.title'),
            placeholder: ogg('general.titlePlaceholder'),
            key: 'title',
          },
          {
            type: 'input',
            label: ogg('general.description'),
            placeholder: ogg('general.descriptionPlaceholder'),
            key: 'description',
          },
          {
            type: 'input',
            label: ogg('general.pageUrl'),
            placeholder: ogg('general.pageUrlPlaceholder'),
            key: 'url',
          },
        ],
      },
      {
        name: ogg('sections.image'),
        elements: [
          {
            type: 'input',
            label: ogg('image.imageUrl'),
            placeholder: ogg('image.imageUrlPlaceholder'),
            key: 'image',
          },
          {
            type: 'input',
            label: ogg('image.imageAlt'),
            placeholder: ogg('image.imageAltPlaceholder'),
            key: 'image:alt',
          },
          {
            type: 'input',
            label: ogg('image.width'),
            placeholder: ogg('image.widthPlaceholder'),
            key: 'image:width',
          },
          {
            type: 'input',
            label: ogg('image.height'),
            placeholder: ogg('image.heightPlaceholder'),
            key: 'image:height',
          },
        ],
      },
      {
        name: ogg('sections.twitter'),
        elements: [
          {
            type: 'select',
            label: ogg('twitter.cardType'),
            placeholder: ogg('twitter.cardTypePlaceholder'),
            key: 'twitter:card',
            options: twitterCardOptions,
          },
          {
            type: 'input',
            label: ogg('twitter.siteAccount'),
            placeholder: ogg('twitter.siteAccountPlaceholder'),
            key: 'twitter:site',
          },
          {
            type: 'input',
            label: ogg('twitter.creatorAccount'),
            placeholder: ogg('twitter.creatorAccountPlaceholder'),
            key: 'twitter:creator',
          },
        ],
      },
    ],
    [ogg]
  );

  // Generate meta tags
  const metaTags = useMemo(() => {
    return generateMetaTags(metadata);
  }, [metadata]);

  // Copy functionality
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  const handleCopyMetaTags = () => {
    handleCopy(metaTags);
  };

  return (
    <ToolLayout title={ogg('title')} description={ogg('description')}>
      {/* Combined Form Section */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.name} className="space-y-4">
                <Label className="text-lg font-semibold border-b pb-2 block">{section.name}</Label>
                {section.elements.map((element) => (
                  <div key={element.key} className="space-y-2">
                    <Label className="text-sm font-medium">{element.label}</Label>
                    {element.type === 'input' ? (
                      <Input
                        value={metadata[element.key] || ''}
                        onChange={(e) => updateMetadata(element.key, e.target.value)}
                        placeholder={element.placeholder}
                        className="font-mono text-sm"
                      />
                    ) : (
                      <Select
                        value={metadata[element.key] || ''}
                        onValueChange={(value) => updateMetadata(element.key, value)}
                      >
                        <SelectTrigger className="font-mono text-sm">
                          <SelectValue placeholder={element.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {element.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{ogg('output.title')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={metaTags}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder={ogg('output.placeholder')}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyMetaTags} disabled={!metaTags} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {ogg('output.copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? ogg('output.copySuccessTooltip') : ogg('output.copyTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
