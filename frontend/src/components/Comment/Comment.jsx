import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "~/store/slice/authSlice";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ Comment ~ user:", user);
  console.log("🚀 ~ Comment ~ comment:", comment);

  useEffect(() => {
    dispatch(getUser({ userId: comment.userId }));
  }, [dispatch, comment.userId]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex shrink-0 mr-3">
        <img
          src={user.data.avatar}
          alt={user.data.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.data.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
      </div>
    </div>
  );
};
export default Comment;
