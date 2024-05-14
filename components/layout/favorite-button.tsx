"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/favorites-context";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FavoriteButtonProps {
  toolId: string;
  toolTitle: string;
  toolHref: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export function FavoriteButton({
  toolId,
  toolTitle,
  toolHref,
  className,
  variant = "ghost",
  size = "icon",
}: FavoriteButtonProps) {
  const t = useTranslations();
  const { toggleFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(toolId);

  const handleToggle = () => {
    toggleFavorite({
      id: toolId,
      title: toolTitle,
      href: toolHref,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(className)}
      title={favorited ? "取消收藏" : "添加收藏"}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors",
          favorited ? "fill-red-500 text-red-500" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}