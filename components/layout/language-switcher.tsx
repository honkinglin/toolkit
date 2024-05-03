"use client"

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages, Check } from "lucide-react"

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' }
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleLanguageChange = (newLocale: string) => {
    // 获取当前路径，去掉语言前缀
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    // 构建新的路径
    const newPath = `/${newLocale}${pathWithoutLocale}`
    
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{language.name}</span>
            {locale === language.code && (
              <Check className="h-4 w-4 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}