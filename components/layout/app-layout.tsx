import { AppSidebar } from "@/components/layout/app-sidebar"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { ThemeSwitch } from "@/components/layout/theme-switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Github } from "lucide-react"

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          
          {/* 左侧可以添加其他内容，比如面包屑导航 */}
          <div className="flex-1">
            {/* 这里可以添加页面标题或面包屑 */}
          </div>
          
          {/* 右侧按钮组 */}
          <div className="ml-auto flex items-center gap-2">
            
            {/* 主题切换 */}
            <ThemeSwitch />

            {/* 语言切换 */}
            <LanguageSwitcher />

            {/* GitHub 链接 */}
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <a
                href="https://github.com/honkinglin/toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}