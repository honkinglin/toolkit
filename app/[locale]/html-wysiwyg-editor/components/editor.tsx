'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MenuBar } from './menu-bar';
import '../editor.css';

interface EditorProps {
  html: string;
  onHtmlChange: (html: string) => void;
}

export function Editor({ html, onHtmlChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: html,
    immediatelyRender: false, // 解决 SSR 水合不匹配问题
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      // 如果内容只有空的 p 标签，返回空字符串
      const cleanedContent = htmlContent === '<p></p>' ? '' : htmlContent;
      onHtmlChange(cleanedContent);
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  // Update editor content when html prop changes
  useEffect(() => {
    if (editor && html !== editor.getHTML()) {
      editor.commands.setContent(html);
    }
  }, [editor, html]);

  if (!editor) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <MenuBar editor={editor} />
        <Separator />
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </CardContent>
    </Card>
  );
}
