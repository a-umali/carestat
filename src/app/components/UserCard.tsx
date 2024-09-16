import React from "react";
import { useSession } from "next-auth/react";

// Define types for props
type UserCardProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { data: session } = useSession(); // Get session data
  const userName = user?.name || session?.user?.name || "User"; // Fallback to session data if available

  return (
    <section className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello, {userName}!
    </section>
  );
};

export default UserCard;
