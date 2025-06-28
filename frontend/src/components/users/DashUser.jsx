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
// import { toast } from "react-toastify";
import { getUsers } from "~/store/slice/authSlice";

const DashUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //   const handleDeletePost = (id) => {
  //     if (window.confirm("Are you sure you want to delete this post")) {
  //       toast
  //         .promise(dispatch(deletePost(id)), { pending: "Loading" })
  //         .then((res) => {
  //           if (!res.error) {
  //             toast.success("Deleted successfully");
  //             dispatch(getPosts({ userId }));
  //           }
  //         });
  //     }
  //   };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {users?.data?.users?.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableHeadCell>Date created</TableHeadCell>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {users?.data?.users?.map((user, index) => (
              <TableBody key={index} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover bg-gray-500"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      //   onClick={() => handleDeletePost(user._id)}
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
export default DashUser;
