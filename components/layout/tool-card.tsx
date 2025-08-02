"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFavorites } from "@/contexts/favorites-context";
import { implementedTools } from "@/lib/tools-data";

export function ToolCard({ tool, featured = false }: { tool: typeof implementedTools[0], featured?: boolean }) {
  const t = useTranslations('home');
  const { toggleFavorite, isFavorited } = useFavorites();
  const Icon = tool.icon;
  const favorited = isFavorited(tool.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id: tool.id,
      title: t(`tools.${tool.id}.title`),
      href: tool.href,
    });
  };
  
  return (
    <Link href={tool.href} className="group">
      <Card className={`h-full transition-all hover:shadow-lg hover:-translate-y-1 relative ${
        featured ? 'border-primary/50 bg-primary/5' : ''
      }`}>
        {/* 收藏按钮 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          title={favorited ? t('badges.removeFromFavorites') : t('badges.addToFavorites')}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              favorited ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                featured ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon className={`h-5 w-5 ${
                  featured ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {t(`tools.${tool.id}.title`)}
                </CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {t(`categories.${tool.category}`)}
                </Badge>
              </div>
            </div>
            {featured && (
              <Badge variant="default" className="text-xs">
                {t('badges.recommended')}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {t(`tools.${tool.id}.description`)}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}