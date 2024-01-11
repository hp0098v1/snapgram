import { Skeleton } from "@/components/ui/skeleton";

export const PostStatsSkeleton = () => {
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-2">
        <Skeleton className="w-6 h-6" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  );
};

export const GridPostsSkeleton = ({
  postsCount = 6,
  showUser = true,
  showStats = true,
}: {
  postsCount?: number;
  showUser?: boolean;
  showStats?: boolean;
}) => {
  return (
    <ul className="grid-container">
      {Array.from(Array(postsCount).keys()).map((key) => (
        <li
          key={`explore-skeleton-key-${key}`}
          className="relative min-w-80 h-80"
        >
          {/* Image Sec */}
          <div className="grid-post_link">
            <Skeleton className="h-full w-full object-cover" />
          </div>

          {/* User Sec & Stats Sec */}
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-20" />
              </div>
            )}

            {showStats && <PostStatsSkeleton />}
          </div>
        </li>
      ))}
    </ul>
  );
};
