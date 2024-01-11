import { PostStatsSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

const PostDetailsSkeleton = () => {
  return (
    <div className="post_details-card">
      {/* Post Image */}
      <Skeleton className="post_details-img" />

      <div className="post_details-info">
        <div className="flex-between w-full">
          {/* Creator Details */}
          <div className="flex items-center gap-3">
            <div>
              <Skeleton className="w-12 h-12 rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="h-5 w-20 mb-2" />
              <div className="flex-center gap-2 text-light-3">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>

          {/* Action Button and Link */}
          <div className="flex-center gap-2">
            <div>
              <Skeleton className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <Skeleton className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        <hr className="border w-full border-dark-4/80" />

        {/* Post Details */}
        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
          <div className="small-medium lg:base-medium py-5">
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="mb-2 h-5 w-1/2" />
            <ul className="flex gap-1 mt-2">
              {Array.from(Array(3).keys()).map((tag: number) => (
                <Skeleton key={tag} className="h-5 w-10" />
              ))}
            </ul>
          </div>
        </div>

        {/* Post Stats */}
        <div className="w-full ">
          <PostStatsSkeleton />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;
