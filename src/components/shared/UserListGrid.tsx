import { Models } from "appwrite";

import UserCard from "@/components/shared/UserCard";

type UserListGridProps = {
  users: Models.Document[];
};

const UserListGrid = ({ users }: UserListGridProps) => {
  return (
    <>
      {users?.map((user: Models.Document) => (
        <UserCard key={user.$id} user={user} />
      ))}
    </>
  );
};

export default UserListGrid;
