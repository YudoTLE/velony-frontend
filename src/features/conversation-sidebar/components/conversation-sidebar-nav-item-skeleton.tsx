import { Skeleton } from '@shared/components/ui/skeleton';

export const ConversationSidebarNavItemSkeleton = () => {
  const titleWidth = ['w-24', 'w-32', 'w-28', 'w-36'][
    Math.floor(Math.random() * 4)
  ];
  const messageWidth = ['w-3/4', 'w-full', 'w-2/3', 'w-5/6'][
    Math.floor(Math.random() * 4)
  ];

  return (
    <div className="h-15 flex items-center gap-2 border-b px-3 py-2 first:border-t">
      {/* Thumbnail skeleton */}
      <Skeleton className="size-10 rounded-full shrink-0" />

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex w-full items-center gap-2">
          {/* Title skeleton */}
          <Skeleton className={`h-4 ${titleWidth}`} />
          {/* Time skeleton */}
          <Skeleton className="h-3 w-12 ml-auto" />
        </div>
        {/* Message skeleton */}
        <Skeleton className={`h-3 ${messageWidth}`} />
      </div>
    </div>
  );
};
