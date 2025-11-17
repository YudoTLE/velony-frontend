import { Skeleton } from '@shared/components/ui/skeleton';

export const ConversationHeaderSkeleton = () => {
  const titleWidth = ['w-32', 'w-40', 'w-36', 'w-44'][
    Math.floor(Math.random() * 4)
  ];
  const usersWidth = ['w-24', 'w-32', 'w-28', 'w-36'][
    Math.floor(Math.random() * 4)
  ];

  return (
    <div className="bg-background border-b px-4 py-2 flex items-center gap-3">
      {/* Thumbnail skeleton */}
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {/* Title skeleton */}
        <Skeleton className={`h-4 ${titleWidth}`} />
        {/* Users skeleton */}
        <Skeleton className={`h-3 ${usersWidth}`} />
      </div>
    </div>
  );
};
