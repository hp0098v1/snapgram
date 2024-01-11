import { Models } from "appwrite";

import { useGetRecentPosts } from "@/lib/react-query/queries";
import { HomeSkeleton } from "@/components/skeletons";
import PostCard from "@/components/shared/PostCard";

const Home = () => {
  const { data: posts, isPending: isPostsLoading } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

          {isPostsLoading && !posts ? (
            <HomeSkeleton />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
