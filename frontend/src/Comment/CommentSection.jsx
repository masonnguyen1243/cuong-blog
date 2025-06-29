import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ CommentSection ~ user:", user);
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Sign in as: </p>
          <img
            src={user?.data?.avatar}
            alt="avatar-pic"
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{user?.data?.username}
          </Link>
        </div>
      ) : (
        <div className="">
          You must be signed in to comment
          <Link to={"/sign-in"}>Sign in</Link>
        </div>
      )}
    </div>
  );
};
export default CommentSection;
