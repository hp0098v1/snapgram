import { Models } from "appwrite";
import { Link } from "react-router-dom";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        className="w-20 h-20 rounded-full"
        src={user.imageUrl}
        alt="User Profile"
      />
      <h3>{user.name}</h3>
      <p>@{user.username}</p>
    </Link>
  );
};

export default UserCard;
