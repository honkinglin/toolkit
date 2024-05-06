"use client"

export function ToolLayout({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  return (
    <div className="tool-layout max-w-2xl flex flex-col items-center justify-center p-12 gap-8 m-auto">
      <div className="tool-layout-header text-center">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg text-gray-500 pt-4">{description}</p>
      </div>
      <div className="tool-layout-body w-full flex flex-col items-center gap-8">{children}</div>
    </div>
  )
}
