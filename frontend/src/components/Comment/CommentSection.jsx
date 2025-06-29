import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createComment } from "~/store/slice/commentSlice";

const CommentSection = ({ postId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  console.log(user, postId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    toast
      .promise(
        dispatch(
          createComment({
            userId: user.data._id,
            postId: postId,
            content: comment,
          })
        ),
        {
          pending: "Loading...",
        }
      )
      .then((res) => {
        if (!res.error) {
          toast.success(res.payload.message);
          setComment("");
        }
      });
  };

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
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment
          <Link to={"/sign-in"} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-400 to-blue-400 cursor-pointer hover:opacity-90"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
export default CommentSection;
