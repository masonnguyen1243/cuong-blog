import { Button, Textarea } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editComment, getUserCommnet } from "~/store/slice/commentSlice";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await dispatch(
          getUserCommnet({ commentId: comment._id })
        ).unwrap();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch comment user:", err.message);
      }
    };
    fetchUser();
  }, [dispatch, comment._id]);

  const handleEditComment = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    toast
      .promise(
        dispatch(
          editComment({ commentId: comment._id, content: editedContent })
        ),
        {
          pending: "Editing...",
        }
      )
      .then((res) => {
        toast.success(res.payload.message);
        setIsEditing(false);
      });
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex shrink-0 mr-3">
        <img
          src={user?.avatar}
          alt={user?.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                onClick={handleEdit}
                className="bg-gradient-to-r from-purple-400 to-blue-400 cursor-pointer hover:opacity-85"
              >
                Submit
              </Button>
              <Button
                type="button"
                outline
                size="sm"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs gap-1 border-t dark:border-gray-700 max-w-fit">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 cursor-pointer ${
                  user &&
                  comment.likes.map((id) => id.toString().includes(user._id)) &&
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
              {currentUser &&
                currentUser.data._id.toString() ===
                  comment.userId.toString() && (
                  <button
                    type="button"
                    onClick={handleEditComment}
                    className="text-gray-400 hover:text-blue-500 cursor-pointer"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Comment;
