import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${className}`} />
);

export const NewsCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
    <Skeleton className="h-48 rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-20 mt-4" />
    </div>
  </div>
);

export const StatsCardSkeleton: React.FC = () => (
  <div className="flex flex-col items-center p-6">
    <Skeleton className="h-10 w-24 mb-2" />
    <Skeleton className="h-4 w-32" />
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="border-b border-slate-100 dark:border-slate-800">
    {[1, 2, 3, 4].map((i) => (
      <td key={i} className="p-4">
        <Skeleton className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

export const ResearchCardSkeleton: React.FC = () => (
  <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
    <div className="flex gap-2 mb-3">
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-6 w-10" />
    </div>
    <Skeleton className="h-6 w-4/5 mb-2" />
    <Skeleton className="h-4 w-3/5" />
  </div>
);
