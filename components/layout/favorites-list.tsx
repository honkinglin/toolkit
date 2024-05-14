"use client"

import Link from 'next/link'

import { ChevronRight, Heart, Hash, Shield, Shuffle, Fingerprint, Snowflake, Lock, QrCode, MessageSquare, Key, Target } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useFavorites } from "@/contexts/favorites-context";

// 工具图标映射
const getToolIcon = (toolId: string) => {
  const iconMap: Record<string, React.ElementType> = {
    "hash-text": Hash,
    "bcrypt": Shield,
    "encrypt-decrypt-text": Lock,
    "hmac-generator": MessageSquare,
    "token-generator": Shuffle,
    "uuids-generator": Fingerprint,
    "ulid-generator": Snowflake,
    "bip39-generator": QrCode,
    "rsa-key-pair-generator": Key,
    "password-strength-analyzer": Target,
  };
  
  return iconMap[toolId] || Hash;
};

export function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <Collapsible
      defaultOpen
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
        >
          <CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>收藏夹</span>
            </div>
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {favorites.map((favorite) => {
                const Icon = getToolIcon(favorite.id);
                return (
                  <SidebarMenuItem key={favorite.id}>
                    <SidebarMenuButton asChild>
                      <Link href={favorite.href}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{favorite.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}