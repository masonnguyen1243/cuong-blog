import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllComments,
  deleteCommentByAdmin,
} from "~/store/slice/commentSlice";

const DashComment = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { allComments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments({}));
  }, [dispatch]);

  const handleDeleteComment = (commentId) => {
    console.log("🚀 ~ handleDeleteComment ~ id:", commentId);
    if (window.confirm("Are you sure you want to delete this comment")) {
      toast
        .promise(dispatch(deleteCommentByAdmin({ commentId })), {
          pending: "Loading",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("Deleted successfully");
            dispatch(getAllComments({}));
          }
        });
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser?.data?.role === "admin" ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Comment content</TableHeadCell>
                <TableHeadCell>Number of likes</TableHeadCell>
                <TableHeadCell>Post</TableHeadCell>
                <TableHeadCell>UserId</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            {allComments?.data?.comments?.map((comment, index) => (
              <TableBody key={index} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>{comment.userId}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => handleDeleteComment(comment._id)}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no comment yet</p>
      )}
    </div>
  );
};
export default DashComment;
