import { Models } from "appwrite";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <img
        className="w-20 h-20 rounded-full"
        src={user.imageUrl}
        alt="User Profile"
      />
      <h3>{user.name}</h3>
      <p>@{user.username}</p>
    </div>
  );
};

export default UserCard;
