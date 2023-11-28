import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser, useGetUserPosts } from "@/lib/react-query/queries";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthStore();
  const { data: currentUser } = useGetCurrentUser();
  const { data: posts, isFetching: isFetchingUserPosts } = useGetUserPosts(
    user.id
  );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        {/* User Detail Section */}
        <div className="flex flex-col justify-start w-full gap-6 lg:gap-10">
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
                {currentUser?.$id === user.id && (
                  <Link to={`/update-profile/${user.id}`} className="block">
                    <Button variant={"ghost"} className="shad-button_dark_4">
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

          <p className="text-light-2 body-regular base-regular ">{user.bio}</p>
        </div>

        {/* User Posts Section */}
        <div className="flex-center mt-10">
          {isFetchingUserPosts ? (
            <Loader />
          ) : (
            posts !== undefined && <GridPostList posts={posts.documents} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
