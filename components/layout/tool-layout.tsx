'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/favorites-context';
import { usePathname } from 'next/navigation';

export function ToolLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toggleFavorite, isFavorited } = useFavorites();

  // 从路径获取工具 ID
  const toolId = pathname.split('/').pop() || '';
  const favorited = isFavorited(toolId);

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: toolId,
      title: title,
      href: pathname,
    });
  };

  return (
    <div className="tool-layout max-w-5xl flex flex-col items-center justify-center py-10 px-4 gap-8 m-auto">
      <div className="tool-layout-header text-center relative w-full">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg text-gray-500 pt-4">{description}</p>

        {/* 收藏按钮 - 右上角 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className="absolute top-0 right-0"
          title={favorited ? '取消收藏' : '添加收藏'}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              favorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </Button>
      </div>
      <div className="tool-layout-body w-full flex flex-col items-center gap-8">{children}</div>
    </div>
  );
}
