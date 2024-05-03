"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { useNavigation } from '@/hooks/use-navigation'
import Link from 'next/link'
import Image from 'next/image'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navigationData } = useNavigation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link className="flex items-center gap-2 w-fit m-auto" href={'/'}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold">Toolkit</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {navigationData.map((group) => (
          <Collapsible
            key={group.titleKey}
            title={group.title}
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
                    {group.icon && <group.icon className="h-4 w-4" />}
                    <span suppressHydrationWarning>{group.title}</span>
                  </div>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.titleKey}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <Link href={item.url}>
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4" />}
                              <span suppressHydrationWarning>{item.title}</span>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}