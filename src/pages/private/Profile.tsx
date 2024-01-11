import { Link, useParams } from "react-router-dom";

import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queries";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import {
  ProfileDetailSkeleton,
  ProfilePostsSkeleton,
} from "@/components/skeletons";

const Profile = () => {
  const { id } = useParams();

  // Zustand
  const { user: loggedInUser } = useAuthStore();

  // Queries
  const { data: user, isFetching: isFetchingUserById } = useGetUserById(
    id || ""
  );
  const { data: posts, isFetching: isFetchingUserPosts } = useGetUserPosts(
    id || ""
  );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        {/* User Detail Section */}
        <div className="flex flex-col justify-start w-full gap-6 lg:gap-10">
          {isFetchingUserById ? (
            <ProfileDetailSkeleton />
          ) : (
            user !== undefined && (
              <>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  <div>
                    <img
                      src={user.imageUrl}
                      alt="user image"
                      className="w-12 h-12 rounded-full lg:w-24 lg:h-24"
                    />
                  </div>

                  <div className="flex justify-between flex-1 max-w-lg ">
                    <div>
                      <h2 className="h2-bold lg:h1-semibold">{user.name}</h2>
                      <p className="text-light-3 small-regular lg:body-regular">
                        @{user.username}
                      </p>
                    </div>

                    <div>
                      {/* Edit Profile Button */}
                      {user.$id === loggedInUser.id && (
                        <Link
                          to={`/update-profile/${user.$id}`}
                          className="block"
                        >
                          <Button
                            variant={"ghost"}
                            className="shad-button_dark_4"
                          >
                            <img
                              className=""
                              src="/assets/icons/edit-profile.svg"
                              alt="edit profile"
                            />
                            Edit Profile
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-light-2 body-regular base-regular ">
                  {user.bio}
                </p>
              </>
            )
          )}
        </div>

        {/* User Posts Section */}
        <div className="flex-center w-full mt-10">
          {isFetchingUserPosts ? (
            <ProfilePostsSkeleton />
          ) : (
            posts !== undefined && <GridPostList posts={posts.documents} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
