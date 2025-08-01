"use client"

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 32, height = 32, className }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 在挂载前显示默认 logo
  const logoSrc = mounted 
    ? (resolvedTheme === 'dark' ? '/logo-white.svg' : '/logo.svg')
    : '/logo.svg'

  return (
    <Image
      src={logoSrc}
      alt="Toolkit Logo"
      width={width}
      height={height}
      priority
      className={className}
    />
  )
}