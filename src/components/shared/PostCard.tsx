import { timeAgo } from "@/lib/utils";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthStore();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={
                post?.creator?.imageUrl ||
                "/assets/images/profile-placeholder.svg"
              }
              alt="creator"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator?.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:smal-regular">
                {timeAgo(post?.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"} `}
        >
          <img src="/assets/icons/edit.svg" alt="edit" className="w-5 h-5" />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <img
          className="post-card_img"
          src={post.imageUrl || "assets/icons/profile-placeholder.svg"}
          alt="image"
        />

        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
