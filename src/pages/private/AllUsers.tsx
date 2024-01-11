import Loader from "@/components/shared/Loader";
import UserListGrid from "@/components/shared/UserListGrid";
import { AllUsersSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useGetInfinteUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetInfinteUsers();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            alt="All users"
            className="w-8 h-8 md:w-12 md:h-12"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        {/* Users */}
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {users !== undefined && (
            <div className="grid-container">
              {users?.pages.map((item, index) => (
                <UserListGrid
                  key={`user-list-grid-${index}`}
                  users={item.documents}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-full max-w-5xl">
          {isFetching ? (
            <AllUsersSkeleton />
          ) : hasNextPage ? (
            <div className={`flex justify-center`}>
              <Button
                className={`shad-button_dark_4`}
                disabled={isFetching}
                onClick={() => fetchNextPage()}
              >
                {isFetching && <Loader />} Load More
              </Button>
            </div>
          ) : (
            <p className="text-center">End of users</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
