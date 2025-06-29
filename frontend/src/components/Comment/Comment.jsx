import moment from "moment";
import { useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "~/store/slice/authSlice";

const Comment = ({ comment, onLike }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //   console.log("🚀 ~ Comment ~ user:", user);
  console.log(comment.userId);

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
        <div className="flex items-center pt-2 text-xs gap-1 border-t dark:border-gray-700 max-w-fit">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 cursor-pointer ${
              user &&
              comment.likes.map((id) =>
                id.toString().includes(user.data._id)
              ) &&
              "text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-500">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "Like" : "Likes")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Comment;
