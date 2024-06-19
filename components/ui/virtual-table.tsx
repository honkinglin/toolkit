import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VirtualTableRow {
  mimeType: string;
  extensions: string[];
}

interface VirtualTableProps {
  data: VirtualTableRow[];
  mimeTypeHeader: string;
  extensionsHeader: string;
}

export function VirtualTable({ data, mimeTypeHeader, extensionsHeader }: VirtualTableProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // 估计每行高度
    overscan: 5,
  });

  return (
    <div className="border rounded-md">
      {/* Table Header */}
      <div className="flex border-b bg-muted/50">
        <div className="w-1/2 px-4 py-3 text-left align-middle font-medium text-muted-foreground">
          {mimeTypeHeader}
        </div>
        <div className="px-4 py-3 text-left align-middle font-medium text-muted-foreground">
          {extensionsHeader}
        </div>
      </div>

      {/* Virtual Table Body */}
      <div ref={parentRef} className="overflow-auto" style={{ height: '400px' }}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const rowData = data[virtualRow.index];
            const isEven = virtualRow.index % 2 === 0;

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={cn(
                    'flex border-b transition-colors hover:bg-muted/50',
                    isEven ? 'bg-background' : 'bg-muted/25'
                  )}
                  style={{ minHeight: `${virtualRow.size}px` }}
                >
                  <div className="w-1/2 px-4 py-3 align-middle">
                    <div className="font-mono text-sm">{rowData.mimeType}</div>
                  </div>
                  <div className="px-4 py-3 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {rowData.extensions.map((extension) => (
                        <Badge key={extension} variant="outline" className="text-xs">
                          .{extension}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
