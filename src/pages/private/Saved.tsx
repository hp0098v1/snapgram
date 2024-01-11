import GridPostList from "@/components/shared/GridPostList";
import { SavedSkeleton } from "@/components/skeletons";
import { useGetSavedPosts } from "@/lib/react-query/queries";
import { useAuthStore } from "@/lib/zustand/useAuthStore";

const Saved = () => {
  const { user } = useAuthStore();
  const { data: savedPosts, isFetching } = useGetSavedPosts(user.id);

  return (
    <div className="saved-container">
      {/* Header */}
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img
          src="/assets/icons/save.svg"
          alt="add"
          className="w-8 h-8 md:w-12 md:h-12"
        />
        <h2 className="body-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {/* Saved Posts */}
      {isFetching ? (
        <SavedSkeleton />
      ) : savedPosts?.length === 0 ? (
        <p>there is no saved post</p>
      ) : (
        savedPosts !== undefined && (
          <GridPostList posts={savedPosts} showUser={false} showStats={false} />
        )
      )}
    </div>
  );
};

export default Saved;
