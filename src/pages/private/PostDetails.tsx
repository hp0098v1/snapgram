import { Link, useNavigate, useParams } from "react-router-dom";

import { useDeletePost, useGetPostById } from "@/lib/react-query/queries";
import { timeAgo } from "@/lib/utils";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";
import { PostDetailsSkeleton } from "@/components/skeletons";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending } = useGetPostById(id || "");
  const { mutateAsync: deletePost } = useDeletePost();

  const { user } = useAuthStore();

  // Handlers
  const deletePostHandler = async () => {
    if (post !== undefined) {
      await deletePost({ postId: post?.$id, imageId: post.imageId });
      navigate("/");
    }
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <PostDetailsSkeleton />
      ) : (
        <div className="post_details-card">
          {/* Post Image */}
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              {/* Creator Details */}
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full object-cover"
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/images/profile-placeholder.svg"
                  }
                  alt="creator"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator?.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:smal-regular">
                      {timeAgo(post?.$createdAt || "")}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Action Button and Link */}
              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={user.id !== post?.creator.$id ? "hidden" : ""}
                >
                  <img
                    className="w-5 h-5 md:w-6 md:h-6"
                    src="/assets/icons/edit.svg"
                    alt="edit"
                  />
                </Link>
                <Button
                  onClick={deletePostHandler}
                  variant={"ghost"}
                  className={`${
                    user.id !== post?.creator.$id && "hidden"
                  } ghost_details-delete_btn`}
                >
                  <img
                    className="w-5 h-5 md:w-6 md:h-6"
                    src="/assets/icons/delete.svg"
                    alt="delete"
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            {/* Post Details */}
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Post Stats */}
            <div className="w-full ">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
