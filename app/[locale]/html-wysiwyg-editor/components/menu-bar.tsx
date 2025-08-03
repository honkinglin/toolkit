'use client';

import { type Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Code2,
  WrapText,
  Eraser,
  Undo,
  Redo,
} from 'lucide-react';

interface MenuBarProps {
  editor: Editor;
}

type MenuItem =
  | {
      type: 'button';
      icon: React.ElementType;
      title: string;
      action: () => void;
      isActive?: () => boolean;
    }
  | { type: 'divider' };

export function MenuBar({ editor }: MenuBarProps) {
  const items: MenuItem[] = [
    {
      type: 'button',
      icon: Bold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      type: 'button',
      icon: Italic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      type: 'button',
      icon: Strikethrough,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      type: 'button',
      icon: Code,
      title: 'Inline code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    { type: 'divider' },
    {
      type: 'button',
      icon: Heading1,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      type: 'button',
      icon: Heading2,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      type: 'button',
      icon: Heading3,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      type: 'button',
      icon: Heading4,
      title: 'Heading 4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    { type: 'divider' },
    {
      type: 'button',
      icon: List,
      title: 'Bullet list',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      type: 'button',
      icon: ListOrdered,
      title: 'Ordered list',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      type: 'button',
      icon: Code2,
      title: 'Code block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'button',
      icon: Quote,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    { type: 'divider' },
    {
      type: 'button',
      icon: WrapText,
      title: 'Hard break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      type: 'button',
      icon: Eraser,
      title: 'Clear format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    { type: 'divider' },
    {
      type: 'button',
      icon: Undo,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      type: 'button',
      icon: Redo,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex items-center gap-1 p-2 flex-wrap">
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <Separator key={`divider-${index}`} orientation="vertical" className="h-6 mx-1" />;
        }

        const Icon = item.icon;
        const isActive = item.isActive?.() || false;

        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={item.action}
                className="h-8 w-8 p-0"
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
