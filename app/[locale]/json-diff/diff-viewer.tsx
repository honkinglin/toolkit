'use client';

import isNull from 'lodash/isNull';
import { useCopy } from '@/hooks/use-copy';
import type { ArrayDifference, Difference, ObjectDifference } from './types';

interface DiffRootViewerProps {
  diff: Difference;
}

export function DiffRootViewer({ diff }: DiffRootViewerProps) {
  return (
    <div className="diffs-viewer text-muted-foreground">
      <ul className="p-0 list-none m-0">
        <DiffViewer diff={diff} showKeys={false} />
      </ul>
    </div>
  );
}

interface DiffViewerProps {
  diff: Difference;
  showKeys?: boolean;
}

function DiffViewer({ diff, showKeys = true }: DiffViewerProps) {
  const { type, status } = diff;

  if (status === 'updated') {
    return <ComparisonViewer diff={diff} showKeys={showKeys} />;
  }

  if (type === 'array') {
    return (
      <ChildrenViewer
        diff={diff}
        showKeys={showKeys}
        showChildrenKeys={false}
        openTag="["
        closeTag="]"
      />
    );
  }

  if (type === 'object') {
    return <ChildrenViewer diff={diff} showKeys={showKeys} openTag="{" closeTag="}" />;
  }

  return <LineDiffViewer diff={diff} showKeys={showKeys} />;
}

function LineDiffViewer({ diff, showKeys }: DiffViewerProps) {
  const { value, key, status, oldValue } = diff;
  const valueToDisplay = status === 'removed' ? oldValue : value;

  return (
    <li>
      <span className={`${status} result`}>
        {showKeys && (
          <>
            <span className="key font-medium text-foreground mr-1">{key}</span>
            {': '}
          </>
        )}
        <ValueComponent value={valueToDisplay} status={status} />
      </span>
      ,
    </li>
  );
}

function ComparisonViewer({ diff, showKeys }: DiffViewerProps) {
  const { value, key, oldValue } = diff;

  return (
    <li className="updated-line py-1">
      {showKeys && (
        <>
          <span className="key font-medium text-foreground mr-1">{key}</span>
          {': '}
        </>
      )}
      <ValueComponent value={oldValue} status="removed" />
      <ValueComponent value={value} status="added" />,
    </li>
  );
}

interface ChildrenViewerProps {
  diff: ArrayDifference | ObjectDifference;
  showKeys: boolean;
  showChildrenKeys?: boolean;
  openTag: string;
  closeTag: string;
}

function ChildrenViewer({
  diff,
  openTag,
  closeTag,
  showKeys,
  showChildrenKeys = true,
}: ChildrenViewerProps) {
  const { children, key, status, type } = diff;

  return (
    <li>
      <div className={`${type} ${status} inline-block`}>
        {showKeys && (
          <>
            <span className="key font-medium text-foreground mr-1">{key}</span>
            {': '}
          </>
        )}

        {openTag}
        {children.length > 0 && (
          <ul className="list-none pl-5 m-0">
            {children.map((childDiff, index) => (
              <DiffViewer
                key={`${childDiff.key}-${index}`}
                diff={childDiff}
                showKeys={showChildrenKeys}
              />
            ))}
          </ul>
        )}
        {`${closeTag},`}
      </div>
    </li>
  );
}

function formatValue(value: unknown) {
  if (isNull(value)) {
    return 'null';
  }

  return JSON.stringify(value);
}

interface ValueComponentProps {
  value: unknown;
  status: string;
}

function ValueComponent({ value, status }: ValueComponentProps) {
  const formattedValue = formatValue(value);
  const { copy } = useCopy({ source: formattedValue });

  const getStatusClasses = (status: string) => {
    const baseClasses =
      'inline-block mr-1 cursor-pointer border border-transparent transition-all duration-200';

    switch (status) {
      case 'added':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-1 py-0.5 rounded hover:border-green-500`;
      case 'removed':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-1 py-0.5 rounded hover:border-red-500`;
      default:
        return baseClasses;
    }
  };

  return (
    <span
      className={`value ${status} ${getStatusClasses(status)}`}
      onClick={copy}
      title="Click to copy value"
    >
      {formattedValue}
    </span>
  );
}
