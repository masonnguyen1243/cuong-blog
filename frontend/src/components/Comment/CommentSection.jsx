import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "~/components/Comment/Comment";
import {
  createComment,
  getPostComments,
  likeComment,
} from "~/store/slice/commentSlice";

const CommentSection = ({ postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { postComments } = useSelector((state) => state.comment);
  // console.log("🚀 ~ CommentSection ~ postComments:", postComments);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    toast
      .promise(
        dispatch(
          createComment({
            userId: currentUser.data._id,
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
          dispatch(getPostComments({ postId }));
        }
      });
  };

  useEffect(() => {
    dispatch(getPostComments({ postId }));
  }, [dispatch, postId]);

  const handleLike = (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      dispatch(likeComment({ commentId }));
      dispatch(getPostComments({ postId }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Sign in as: </p>
          <img
            src={currentUser?.data?.avatar}
            alt="avatar-pic"
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser?.data?.username}
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
      {currentUser && (
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
      {postComments?.data?.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="flex text-sm my-5 items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-500 py-1 px-2 rounded-sm">
              <p>{postComments?.data?.length}</p>
            </div>
          </div>

          {postComments?.data?.map((com, index) => (
            <Comment key={index} comment={com} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
};
export default CommentSection;
