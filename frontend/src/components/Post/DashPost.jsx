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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPosts, deletePost } from "~/store/slice/postSlice";

const DashPost = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const userId = user.data._id;

  useEffect(() => {
    dispatch(getPosts({}));
  }, [dispatch]);

  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post")) {
      toast
        .promise(dispatch(deletePost(id)), { pending: "Loading" })
        .then((res) => {
          if (!res.error) {
            toast.success("Deleted successfully");
            dispatch(getPosts({ userId }));
          }
        });
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {user?.data?.rest?.role === "admin" && post?.data?.posts?.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Data updated</TableHeadCell>
                <TableHeadCell>Post image</TableHeadCell>
                <TableHeadCell>Post title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>
                  <span>Edit</span>
                </TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            {post?.data?.posts?.map((post, index) => (
              <TableBody key={index} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/update-post/${post._id}`}
                      className="text-teal-500 hover:underline"
                    >
                      <span className="">Edit</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => handleDeletePost(post._id)}
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
        <p>You have no post yet</p>
      )}
    </div>
  );
};
export default DashPost;
