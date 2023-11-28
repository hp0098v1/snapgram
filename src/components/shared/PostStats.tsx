import React, { useState, useEffect } from "react";
import { Models } from "appwrite";

import {
  useDeleteSavedPosts,
  useGetCurrentUser,
  useLikePosts,
  useSavePosts,
} from "@/lib/react-query/queries";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  // Queries
  const { mutate: likePost } = useLikePosts();
  const { mutate: savePost, isPending: isSavingPost } = useSavePosts();
  const { mutate: deleteSavedPost, isPending: isDeletingPost } =
    useDeleteSavedPosts();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  // Handlers
  const likePostHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const savePostHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post?.$id || "", userId });
    }
  };

  const checkIsLiked = (userId: string) => {
    return likes.includes(userId);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          onClick={likePostHandler}
          className="w-5 h-5 cursor-pointer"
          src={
            checkIsLiked(userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            onClick={savePostHandler}
            className="w-5 h-5 cursor-pointer"
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
